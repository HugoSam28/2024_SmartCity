export const getAllSponsoring = async(SQLClient, {iPage}, {column}) => {
  const validColumnsQuery = `
  (SELECT column_name
  FROM information_schema.columns
  WHERE table_name = 'sponsoring')
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
    WITH sponsoring_page AS (
      SELECT s.sponsor, pS.email AS sponsor_email, s.referred, pR.email AS referred_email FROM sponsoring s
      JOIN person pS ON s.sponsor = pS.id JOIN person pR ON s.referred = pR.id
      ORDER BY ${column} LIMIT 10 OFFSET ($1 - 1) * 10) 
    SELECT * FROM sponsoring_page`, [iPage]);
  return rows;
}

export const sponsoringCount = async(SQLClient) => {
  const {rows} = await SQLClient.query(`SELECT COUNT(*) FROM sponsoring`);
  return rows[0]?.count;
}

export const getSearchSponsoring = async(SQLClient, {iPage}, {value}, {column}) => {
  const validColumnsQuery = `
  (SELECT column_name
  FROM information_schema.columns
  WHERE table_name = 'sponsoring')
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
    WITH sponsoring_page AS (
      SELECT s.sponsor, pS.email AS sponsor_email, s.referred, pR.email AS referred_email FROM sponsoring s
      JOIN person pS ON s.sponsor = pS.id JOIN person pR ON s.referred = pR.id
      WHERE (pS.email ILIKE '%'||$2||'%' OR pR.email ILIKE '%'||$2||'%')
      ORDER BY ${column} LIMIT 10 OFFSET ($1 - 1) * 10) 
    SELECT * FROM sponsoring_page`, 
    [iPage, value]
  );
  return rows;
}

export const sponsoringSearchCount = async(SQLClient, {value}) => {
  const {rows} =  await SQLClient.query(`SELECT COUNT(*) FROM sponsoring s JOIN person pS ON s.sponsor = pS.id JOIN person pR ON s.referred = pR.id
    WHERE (pS.email ILIKE '%'||$1||'%' OR pR.email ILIKE '%'||$1||'%')`, [value]);
    return rows[0]?.count;
}

export const getSponsoringByID = async(SQLClient, {id}) => {
    const {rows} = await SQLClient.query(`SELECT * FROM sponsoring WHERE id = $1`, [id]);
    return rows[0];
}

export const addSponsoring = async(SQLClient, {sponsor, referred}) =>{
    const {rows} = await SQLClient.query(`INSERT INTO sponsoring (sponsor, referred) VALUES ($1, $2) RETURNING referred`, [sponsor, referred]);
    return rows[0]?.referred;
}

export const updateSponsoring = async(SQLClient, {sponsor, referred}) =>{
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
      queryValues.push(referred);
      query += `${querySet.join(", ")} WHERE referred = $${queryValues.length}`;
      return await SQLClient.query(query, queryValues);
  } else {
      throw new Error("No field given");
  }
}

export const deleteSponsoring = async(SQLClient, {idList}) => {
  return await SQLClient.query(`DELETE FROM sponsoring WHERE referred = ANY($1)`, [idList]);
}