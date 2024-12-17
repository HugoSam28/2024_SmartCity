
export const getAllTrips = async(SQLClient, {iPage}, {column}) => {
  const validColumnsQuery = `
  (SELECT column_name
  FROM information_schema.columns
  WHERE table_name = 'trip')
  UNION ALL
  (SELECT column_name
  FROM information_schema.columns
  WHERE table_name = 'person' AND column_name = 'email')
`;

const validColumnsResult = await SQLClient.query(validColumnsQuery);
const validColumns = validColumnsResult.rows.map(row => row.column_name);

if (!validColumns.includes(column)) {
  throw new Error('Invalid column name');
}

  const {rows} = await SQLClient.query(`
    WITH trips_page AS (
      SELECT p.email, t.* FROM trip t
      JOIN person p ON t.person_id = p.id
      ORDER BY ${column} LIMIT 10 OFFSET ($1 - 1) * 10) 
    SELECT * FROM trips_page`, [iPage]);
  return rows;
}

export const tripsCount = async(SQLClient) => {
  const {rows} = await SQLClient.query(`SELECT COUNT(*) FROM trip`);
  return rows[0]?.count;
}

export const getSearchTrips = async(SQLClient, {iPage}, {value}, {column}) => {
  const validColumnsQuery = `
    (SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'trip')
    UNION ALL
    (SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'person' AND column_name = 'email')
  `;

  const validColumnsResult = await SQLClient.query(validColumnsQuery);
  const validColumns = validColumnsResult.rows.map(row => row.column_name);

  if (!validColumns.includes(column)) {
    throw new Error('Invalid column name');
  }

  const {rows} = await SQLClient.query(`
    WITH trips_page AS (
      SELECT p.email, t.* FROM trip t
      JOIN person p ON t.person_id = p.id
      WHERE p.email ILIKE '%'||$2||'%'
      ORDER BY ${column} LIMIT 10 OFFSET ($1 - 1) * 10) 
      SELECT * FROM trips_page`, 
    [iPage, value]
  );
  return rows;
}

export const tripsSearchCount = async(SQLClient, {value}) => {
  const {rows} = await SQLClient.query(`SELECT COUNT(*) FROM trip t JOIN person p ON t.person_id = p.id WHERE p.email ILIKE '%'||$1||'%'`, [value]);
  return rows[0]?.count;
}

export const getOwnTrips = async(SQLClient, {id}) => {
  const {rows} = await SQLClient.query(`SELECT * FROM trip WHERE person_id = $1 ORDER BY starting_date DESC`, [id]);
  return rows;
}

export const getTripById = async(SQLClient, {id}) => {
  const {rows} = await SQLClient.query(`SELECT * FROM trip WHERE id = $1`, [id]);
  return rows[0];
}

export const startTrip = async(SQLClient, {personId, vehicleId, startingDate, startingLocationLon, startingLocationLat}) => {
  const {rows} = await SQLClient.query(`INSERT INTO trip (person_id, vehicle_id, starting_date, starting_location) 
      VALUES ($1, $2, $3, point($4,$5)) RETURNING id`, [personId, vehicleId, startingDate, startingLocationLon, startingLocationLat]);
      return rows[0]?.id;
}

export const endTrip = async(SQLClient, {id, endingDate, endingLocationLon, endingLocationLat}) => {
  const {rows} = await SQLClient.query(`UPDATE trip SET ending_date = $1, ending_location = point($2,$3), distance = 
    111195 * DEGREES(ACOS(
    COS(RADIANS($3)) * COS(RADIANS(starting_location[1])) *
    COS(RADIANS(starting_location[0]) - RADIANS($2)) +
    SIN(RADIANS($3)) * SIN(RADIANS(starting_location[1]))
    )) WHERE id = $4 RETURNING vehicle_id`, [endingDate, endingLocationLon, endingLocationLat, id]);
  return rows[0]?.vehicle_id;
}

export const addTrip = async(SQLClient, {personId, vehicleId, startingDate, endingDate, distance, cost, startingLocationLon, startingLocationLat, endingLocationLon, endingLocationLat}) => {
  const {rows} = await SQLClient.query(`INSERT INTO trip (person_id, vehicle_id, starting_date, ending_date, distance, cost, starting_location, ending_location) 
      VALUES ($1, $2, $3, $4, $5, $6, point($7, $8), point($9, $10)) RETURNING id`, [personId, vehicleId, startingDate, endingDate, distance, cost, startingLocationLon, startingLocationLat, endingLocationLon, endingLocationLat]);
  return rows[0]?.id;
}

export const updateTrip = async(SQLClient, {id, personId, vehicleId, startingDate, endingDate, distance, cost, startingLocationLon, startingLocationLat, endingLocationLon, endingLocationLat}) => {
  let query = `UPDATE trip SET `;
  const querySet = [];
  const queryValues = [];
  if(personId){
    queryValues.push(personId);
    querySet.push(`person_id = $${queryValues.length}`);
  }
  if(vehicleId){
    queryValues.push(vehicleId);
    querySet.push(`vehicle_id = $${queryValues.length}`);
  }
  if(startingDate){
    queryValues.push(startingDate);
    querySet.push(`starting_date = $${queryValues.length}`);
  }
  if(endingDate){
    queryValues.push(endingDate);
    querySet.push(`ending_date = $${queryValues.length}`);
  }
  if(distance){
    queryValues.push(distance);
    querySet.push(`distance = $${queryValues.length}`);
  }
  if(startingLocationLon && startingLocationLat){
    queryValues.push(startingLocationLon);
    queryValues.push(startingLocationLat);
    querySet.push(`starting_location = point($${queryValues.length - 1},$${queryValues.length})`);
  }
  if(endingLocationLon && endingLocationLat){
    queryValues.push(endingLocationLon);
    queryValues.push(endingLocationLat);
    querySet.push(`ending_location = point($${queryValues.length - 1},$${queryValues.length})`);
  }
  if(cost){
    queryValues.push(cost)
    querySet.push(`cost = $${queryValues.length}`)
  }
  if(queryValues.length > 0){
      queryValues.push(id);
      query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
      return await SQLClient.query(query, queryValues);
  } else {
      throw new Error(`No field given`);
  }
}

export const deleteTrip = async(SQLClient, {idList}) => {
  return await SQLClient.query(`DELETE FROM trip WHERE id = ANY($1)`, [idList]);
}









