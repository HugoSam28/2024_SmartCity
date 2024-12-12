
export const getAllVehicles = async(SQLClient, {iPage}, {column}) => {
  
  const {rows} = await SQLClient.query(`WITH vehicles_pages AS (
    SELECT * FROM vehicle
    ORDER BY $2 LIMIT 10 OFFSET ($1 - 1) * 10) SELECT
    v.*, wl.brand, wl.model, wl.chassis_number
    FROM Vehicles_pages v
    LEFT JOIN With_licence wl ON v.id = wl.id
    order by $2`, [iPage, column]);

  return rows;
}

export const vehiclesCount = async(SQLClient) => {
  return await SQLClient.query(`SELECT COUNT(*) FROM vehicles`);
}

export const getSearchVehicles = async(SQLClient, {iPage}, {value}, {column}) => {
  const {rows} = await SQLClient.query(`WITH vehicles_pages AS (
    SELECT * FROM vehicle
    ORDER BY $3 LIMIT 10 OFFSET ($1 - 1) * 10) SELECT
    v.*, wl.brand, wl.model, wl.chassis_number
    FROM Vehicles_pages v
    LEFT JOIN With_licence wl ON v.id = wl.id
    WHERE v.type ILIKE '%$2%'
    order by $3`, [iPage, value, column]);
  return rows;
}

export const vehiclesSearchCount = async(SQLClient, {value}) => {
  return await SQLClient.query(`SELECT COUNT(*) FROM vehicle WHERE type ILIKE %$1%`, [value]);
}

export const getVehiclesAroundMe = async(SQLClient, {lat, lon, distance}) => {
  const {rows} = await SQLClient.query(`SELECT id, location, type FROM Vehicle 
    WHERE 111195 * DEGREES(ACOS(COS(RADIANS($1)) * COS(RADIANS(location[1])) * COS(RADIANS(location[0]) 
    - RADIANS($2)) + SIN(RADIANS($1)) * SIN(RADIANS(location[1])))) <= $3;`,
    [lat, lon, distance]);
  return rows;
}

export const getVehicleById = async(SQLClient, {id}) => {
  const {rows} = await SQLClient.query(`SELECT * FROM ${id % 2 === 0 ? 'with_licence' : 'vehicle' } WHERE id = $1`, [id]);
  return rows[0];
}

export const addVehicle = async(SQLClient, {lon, lat, batteryLevel, type, price, isAvailable, fees, brand, model, chassisNumber}) => {
  if (type === 'Voiture' || type === 'Scooter') {
    const {rows} = await SQLClient.query(
      `INSERT INTO With_licence (location, battery_level, type, price, is_available, fees, brand, model, chassis_number) VALUES 
      (POINT($1, $2), $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`, [lon, lat, batteryLevel, type, price, isAvailable, fees, brand, model, chassisNumber]);
    return rows[0]?.id;
  }
  const {rows} = await SQLClient.query(
    `INSERT INTO vehicle (location, battery_level, type, price, is_available, fees) VALUES 
    (POINT($1, $2), $3, $4, $5, $6, $7) RETURNING id`, [lon, lat, batteryLevel, type, price, isAvailable, fees]);
  return rows[0]?.id;
}

export const updateStatus = async(SQLClient, {id}) => {
  const is_available = await SQLClient.query(`GET is_available FROM vehicle WHERE id = $1`, [id]);
  return await SQLClient.query(`UPDATE vehicle SET is_available = $1 WHERE id = $2`, [!is_available, id]);
}

export const updateInformations = async(SQLClient, {id, lon, lat, batteryLevel, type, price, isAvailable, fees, brand, model, chassisNumber}) => {
  let query = `UPDATE ${id%2===0 ? 'with_licence' : 'vehicle'} SET `;
  const querySet = [];
  const queryValues = [];

  if (lon && lat) {
    queryValues.push(lon);
    queryValues.push(lat);
    querySet.push(`location = point($1,$2)`);
  }
  if (batteryLevel){
    queryValues.push(batteryLevel);
    querySet.push(`battery_level = $${queryValues.length}`)
  }
  if (type){
    queryValues.push(type);
    querySet.push(`type = $${queryValues.length}`)
  }
  if (price){
    queryValues.push(price);
    querySet.push(`price = $${queryValues.length}`)
  }
  if (isAvailable !== undefined){
    queryValues.push(isAvailable);
    querySet.push(`is_available = $${queryValues.length}`)
  }
  if (fees){
    queryValues.push(fees);
    querySet.push(`fees = $${queryValues.length}`)
  }
  if (id%2 === 0){
    if (brand){
      queryValues.push(brand);
      querySet.push(`brand = $${queryValues.length}`)
    }
    if (model){
      queryValues.push(model);
      querySet.push(`model = $${queryValues.length}`)
    }
    if (chassisNumber){
      queryValues.push(chassisNumber);
      querySet.push(`chassis_number = $${queryValues.length}`)
    }
  }
  if(queryValues.length > 0){
    queryValues.push(id);
    query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
    return await SQLClient.query(query, queryValues);
  } else {
    throw new Error(`No field given`);
  }
}

export const deleteVehicles = async(SQLClient, {idList}) => {
  return await SQLClient.query(`DELETE FROM Vehicle WHERE id = ANY($1)`, [idList]);
}