
export async function getAllVehicles(SQLClient, {iPage}) { // admin
  
  const {rows} = await SQLClient.query("WITH vehicles AS ( " +
    "SELECT * FROM vehicles" +
    "ORDER BY id LIMIT 10 OFFSET (:$1 - 1) * 10) "+
    "SELECT * FROM vehicles", [iPage]);

  return rows;
}

export async function getVehiclesAroundMe(SQLClient, {lat, lon, distance}) {
  const {rows} = await SQLClient.query("SELECT * FROM Vehicle " +
    " WHERE 111195 * DEGREES(ACOS(COS(RADIANS($1)) * COS(RADIANS(location[1])) * COS(RADIANS(location[0]) " +
    "- RADIANS($2)) + SIN(RADIANS($1)) * SIN(RADIANS(location[1])))) <= $3;",
    [lat, lon, distance]);
  return rows;
}

export async function getVehicleById(SQLClient, {id}) {
  if (id % 2 === 0) {
    const {rows} = await SQLClient.query("SELECT * FROM  WHERE id = $1", [id]);
  }
  else {
    const {rows} = await SQLClient.query(`SELECT * FROM ${id % 2 === 0 ? 'with_licence' : 'vehicle' } WHERE id = $1`, [id]);
  }
  return rows[0];
}

export async function addVehicle(SQLClient, {lat, lon, batteryLevel, type, price, isAvailable, fees, brand, model, chassisNumber}) {
  if (type === 'Voiture' || 'Scooter') {
    const {rows} = SQLClient.query(
      "INSERT INTO With_licence (location, battery_level, type, brand, price, is_available, fees, model, chassis_number) VALUES " +
      "point($2,$1), $3, $4, $5, $6, $7, $8, $9, $10", [lat, lon, batteryLevel, type, price, isAvailable, fees, brand, model, chassisNumber])
  }
  else {
    const {rows} = SQLClient.query(
      "INSERT INTO vehicle (location, battery_level, type, brand, price, is_available, fees, model, chassis_number) VALUES " +
      "point($2,$1), $3, $4, $5, $6, $7", [lat, lon, batteryLevel, type, price, isAvailable, fees]);
  }
  return rows[0]?.id;
}

export async function updateStatus(SQLClient, {id}) {
  const is_available = await SQLClient.query("GET is_available FROM vehicle WHERE id = $1", [id]);
  return await SQLClient.query("UPDATE vehicle SET is_available = $1 WHERE id = $2", [!is_available, id]);
}

export async function updateInformations(SQLClient, {id, lat, lon, batteryLevel, type, price, isAvailable, fees, brand, model, chassisNumber}){
  let query = `UPDATE ${id%2===0 ? 'with_licence' : 'vehicle'} SET `;
  const querySet = [];
  const queryValues = [];

  if (lat && lon) {
    queryValues.push(lat);
    queryValues.push(lon);
    querySet.push(`location = point($2,$1)`);
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
    queryValues.push(isAvailable !== undefined);
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
    throw new Error("No field given");
  }
}

export async function deleteVehicles(SQLClient, {idList}){
  const query = "DELETE FROM Vehicle WHERE id = ANY($1)";
  const idArray = idList.split(',').map(Number);
  return await SQLClient.query(query, [idArray]);
}