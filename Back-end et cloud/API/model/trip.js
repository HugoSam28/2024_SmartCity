export async function getOwnTrips(SQLClient, {client_id}){
    const {rows} = await SQLClient.query("SELECT * FROM trip WHERE client_ID= $1 ORDER BY starting_date DESC;", [client_id]);
    return rows;
}

export async function deleteTrip(SQLClient, {idList}) {
  return await SQLClient.query("DELETE FROM trip WHERE id IN ($1)", [idList])
}

export async function addTrip(SQLClient, {clientID, vehicleID, startingDate, endindDate, distance, startingLocation, endingLocation}){
    const {rows} = await SQLClient.query("INSERT INTO trip (client_id, vehicle_id, starting_date, endind_date, distance, starting_location, ending_location)" +
        " VALUES ($1, $2, $3, $4, $5, $6, $7)", [clientID, vehicleID, startingDate, endindDate, distance, startingLocation, endingLocation]);
        return rows[0];
}

export async function updateTrip(SQLClient, {clientID, vehicleID, startingDate, endindDate, distance, startingLocationLat, startingLocationLon, endingLocationLat, endingLocationLon}){
  let query = "UPDATE trip SET ";
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
  if(queryValues.length > 0){
      queryValues.push(id);
      query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
      return await SQLClient.query(query, queryValues);
  } else {
      throw new Error("No field given");
  }
}