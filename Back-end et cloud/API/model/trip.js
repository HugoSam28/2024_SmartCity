
export async function getAllTrips(SQLClient, {iPage}) { // admin
  
  const {rows} = await SQLClient.query("WITH Trip AS ( " +
    "SELECT * FROM Trip" +
    "ORDER BY id LIMIT 10 OFFSET (:$1 - 1) * 10) "+
    "SELECT * FROM Trip", [iPage]);

  return rows;
}

export async function getOwnTrips(SQLClient, {client_id}){
  const {rows} = await SQLClient.query("SELECT * FROM trip WHERE client_ID= $1 ORDER BY starting_date DESC;", [client_id]);
  return rows;
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

export async function addTrip(SQLClient, {clientID, vehicleID, startingDate, endindDate, distance, startingLocation, endingLocation}){
    const {rows} = await SQLClient.query("INSERT INTO trip (client_id, vehicle_id, starting_date, endind_date, distance, starting_location, ending_location)" +
        " VALUES ($1, $2, $3, $4, $5, $6, $7)", [clientID, vehicleID, startingDate, endindDate, distance, startingLocation, endingLocation]);
        return rows[0];
}

export async function startTrip(SQLClient, {clientID, vehicleID, startingDate, startingLocation}){
  const {rows} = await SQLClient.query("INSERT INTO trip (client_id, vehicle_id, starting_date, starting_location)" +
      " VALUES ($1, $2, $3, $4,) RETURNING id", [clientID, vehicleID, startingDate, startingLocation]);
      return rows[0]?.id;
}

export async function deleteTrip(SQLClient, {idList}) {
  const query = "DELETE FROM Trip WHERE id = ANY($1)";
  const idArray = idList.split(',').map(Number);
  return await SQLClient.query(query, [idArray]);
}

export async function tripsCount(SQLClient) {
  return await SQLClient.query("SELECT COUNT(*) FROM Trip");
}

export async function tripsSearchCount(SQLClient) {
  return await SQLClient.query("SELECT COUNT(*) FROM Trip JOIN Person p ON Trip.person_id = p.id WHERE p.email ILIKE %$1%");
}

export async function getSearchTrips(SQLClient, {value},  {iPage}) {
  const rows = await SQLClient.query(
    `WITH Trip AS (SELECT * FROM Trip
    ORDER BY id LIMIT 10 OFFSET ($2 - 1) * 10) 
    SELECT id, person_ID, email, vehicle_ID, starting_date, ending_date, distance, starting_location, ending_location FROM Trip
    JOIN Person p ON Trip.person_id = p.id
    WHERE p.email ILIKE '%$1%'`, 
    [value]
  );
  return rows;
}




