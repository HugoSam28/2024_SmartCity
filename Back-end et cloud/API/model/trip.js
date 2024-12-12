
export const getAllTrips = async(SQLClient, {iPage}, {column}) => {
  const {rows} = await SQLClient.query(`WITH trips_page AS (
    SELECT * FROM trips
    ORDER BY sponsor LIMIT 10 OFFSET ($1 - 1) * 10) 
    SELECT p.email, t.* FROM trips_page t
    JOIN Person p ON t.person_id = p.id
    ORDER BY $2`, [iPage, column]);
  return rows;
}

export const tripsCount = async(SQLClient) => {
  return await SQLClient.query(`SELECT COUNT(*) FROM Trip`);
}

export const getSearchTrips = async(SQLClient, {iPage}, {value}, {column}) => {
  const {rows} = await SQLClient.query(`WITH trips_page AS (
    SELECT * FROM trip
    ORDER BY id LIMIT 10 OFFSET ($1 - 1) * 10) 
    SELECT p.email, t.* FROM trips_page t
    JOIN Person p ON t.person_id = p.id
    WHERE p.email ILIKE '%$2%'
    ORDER BY $3`, 
    [iPage, value, column]
  );
  return rows;
}

export const tripsSearchCount = async(SQLClient, {value}) => {
  return await SQLClient.query(`SELECT COUNT(*) FROM Trip t JOIN Person p ON t.person_id = p.id WHERE p.email ILIKE %$1%`, [value]);
}

export const getOwnTrips = async(SQLClient, {id}) => {
  const {rows} = await SQLClient.query(`SELECT * FROM trip WHERE person_id = $1 ORDER BY starting_date DESC;`, [id]);
  return rows;
}

export const startTrip = async(SQLClient, {personId, vehicleID, startingDate, startingLocation}) => {
  const {rows} = await SQLClient.query(`INSERT INTO trip (person_id, vehicle_id, starting_date, starting_location) 
      VALUES ($1, $2, $3, $4,) RETURNING id`, [personId, vehicleID, startingDate, startingLocation]);
      return rows[0]?.id;
}

export const endTrip = async(SQLClient, {id, endingDate, endingLocation}) => {
  await SQLClient.query(`UPDATE trip SET ending_date = $1, ending_location = $2, distance = 
    111195 * DEGREES(ACOS(
    COS(RADIANS($3)) * COS(RADIANS(starting_location[1])) *
    COS(RADIANS(starting_location[0]) - RADIANS($4)) +
    SIN(RADIANS($3)) * SIN(RADIANS(starting_location[1]))
    )) WHERE id = $5`, endingDate, endingLocation, endingLocation[1], endingLocation[0], id);
}

export const updateTrip = async(SQLClient, {clientID, vehicleID, startingDate, endindDate, distance, startingLocationLat, startingLocationLon, endingLocationLat, endingLocationLon, cost}) => {
  let query = `UPDATE trip SET `;
  const querySet = [];
  const queryValues = [];
  if(clientID){
    queryValues.push(clientID);
    querySet.push(`client_id = $${queryValues.length}`);
  }
  if(vehicleID){
    queryValues.push(vehicleID);
    querySet.push(`vehicle_id = $${queryValues.length}`);
  }
  if(startingDate){
    queryValues.push(startingDate);
    querySet.push(`startingate = $${queryValues.length}`);
  }
  if(endindDate){
    queryValues.push(endindDate);
    querySet.push(`endindDate = $${queryValues.length}`);
  }
  if(distance){
    queryValues.push(distance);
    querySet.push(`distance = $${queryValues.length}`);
  }
  if(startingLocationLat && startingLocationLon){
    queryValues.push(startingLocationLat);
    queryValues.push(startingLocationLon);
    querySet.push(`starting_location = point($${queryValues.length},$${queryValues.length - 1})`);
  }
  if(endingLocationLat && endingLocationLon){
    queryValues.push(endingLocationLat);
    queryValues.push(endingLocationLon);
    querySet.push(`ending_location = point($${queryValues.length},$${queryValues.length - 1})`);
  }
  if(cost){
    queryValues.push(cost)
    querySet.push(`cost = $${queryValues.length}`)
  }
  if(queryValues.length > 0){
      queryValues.push(clientID);
      query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
      return await SQLClient.query(query, queryValues);
  } else {
      throw new Error(`No field given`);
  }
}

export const addTrip = async(SQLClient, {clientID, vehicleID, startingDate, endindDate, distance, startingLocation, endingLocation}) => {
    const {rows} = await SQLClient.query(`INSERT INTO trip (client_id, vehicle_id, starting_date, endind_date, distance, starting_location, ending_location) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`, [clientID, vehicleID, startingDate, endindDate, distance, startingLocation, endingLocation]);
        return rows[0];
}



export const deleteTrip = async(SQLClient, {idList}) => {
  const query = `DELETE FROM Trip WHERE id = ANY($1)`;
  const idArray = idList.split(',').map(Number);
  return await SQLClient.query(query, [idArray]);
}









