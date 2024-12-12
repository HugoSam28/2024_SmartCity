export const getAllSponsorings = async(SQLClient, {iPage}, {value}) => {
  const {rows} = await SQLClient.query(`WITH sponsorings_page AS (
    SELECT * FROM sponsoring
    ORDER BY $2 LIMIT 10 OFFSET ($1 - 1) * 10) 
    SELECT s.sponsor, pS.email, s.referred, pR.email FROM sponsorings_page s
    JOIN Person pS ON s.sponsor = pS.id JOIN Person pR ON s.referred = pR.id
    ORDER BY $2`, [iPage, value]);
  return rows;
}

export const sponsoringsCount = async(SQLClient) => {
  const {rows} = await SQLClient.query(`SELECT COUNT(*) FROM Sponsoring`);
  return rows[0]?.count;
}

export const getSearchSponsorings = async(SQLClient, {iPage}, {value}, {column}) => {
  const {rows} = await SQLClient.query(`WITH sponsorings_page AS (
    SELECT * FROM sponsoring
    ORDER BY $3 LIMIT 10 OFFSET ($1 - 1) * 10) 
    SELECT s.sponsor, pS.email, s.referred, pR.email FROM sponsorings_page s
    JOIN Person pS ON s.sponsor = pS.id JOIN Person pR ON s.referred = pR.id
    WHERE (pS.email ILIKE '%$2%' OR pR.email ILIKE '%$2%')
    ORDER BY $3`, 
    [iPage, value, column]
  );
  return rows;
}

export const sponsoringsSearchCount = async(SQLClient, {value}) => {
  return await SQLClient.query(`SELECT COUNT(*) FROM Sponsoring s JOIN Person pS ON s.sponsor = pS.id JOIN Person pR ON s.referred = pR.id
    WHERE (pS.email ILIKE '%$1%' OR pR.email ILIKE '%$1%')`, [value]);
}

export const getSponsoringByID = async(SQLClient, {id}) => {
    const {rows} = await SQLClient.query(`SELECT * FROM sponsoring WHERE id = $1`, [id]);
    return rows[0];
}

export const addSponsoring = async(SQLClient, sponsor, referred) =>{
    const {rows} = await SQLClient.query(`INSERT INTO sponsoring (sponsor, referred) VALUES ($1, $2) RETURNING referred`, [sponsor, referred]);
    return rows[0]?.referred;
}

export const updateSponsoring = async(SQLClient, {idReferred, sponsor, referred}) =>{
  let query = `UPDATE sponsoring SET `;
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
      queryValues.push(idReferred);
      query += `${querySet.join(", ")} WHERE referred = $${queryValues.length}`;
      return await SQLClient.query(query, queryValues);
  } else {
      throw new Error("No field given");
  }
}

export const deleteSponsoring = async(SQLClient, {idList}) => {
  return await SQLClient.query(`DELETE FROM Sponsoring WHERE referred = ANY($1)`, [idList]);
}