export async function getSponsoringByID(SQLClient, {id}){
    const {rows} = await SQLClient.query("SELECT * FROM sponsoring WHERE id = $1", [id]);
    return rows[0];
}

export async function deleteSponsoring(SQLClient, {idList}){
  return await SQLClient.query("DELETE FROM sponsoring WHERE id in ($1)", [idList]);
}

export async function addSponsoring(SQLClient, {sponsor, referred}){
    const {rows} = await SQLClient.query("INSERT INTO sponsoring (sponsor, referred) VALUES ($1, $2)", [sponsor, referred]);
    return rows[0];
}

export async function updateSponsoring(SQLClient, {id, sponsor, referred}){
    let query = "UPDATE sponsoring SET ";
  const querySet = [];
  const queryValues = [];
  if(sponsor){
    queryValues.push(sponsor);
    querySet.push(`sponsor = $${queryValues.length}`);
  }
  if(referred){
    queryValues.push(referred);
    querySet.push(`referred = $${queryValues.length}`);
  }
  if(queryValues.length > 0){
      queryValues.push(id);
      query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
      return await SQLClient.query(query, queryValues);
  } else {
      throw new Error("No field given");
  }
}