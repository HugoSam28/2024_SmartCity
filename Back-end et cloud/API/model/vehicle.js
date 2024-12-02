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

export async function deleteVehicle(SQLClient, {idList}){ 
  return await SQLClient.query("DELETE FROM vehicle WHERE id IN ($1)", [idList]);
}

export async function updateVehicle(SQLClient, {id, lat, lon, batteryLevel, type, price, isAvailable, fees, brand, model, chassisNumber}){
  let query = `UPDATE ${id%2===0 ? 'with_license' : 'vehicle'} SET `;
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