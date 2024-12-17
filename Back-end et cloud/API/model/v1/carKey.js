export const getAllCarKeys= async(SQLClient, {iPage}, {column}) => {
  const validColumnsQuery = `
    (SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'car_key')
    UNION ALL
    (SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'vehicle' AND column_name = 'model')
  `;

  const validColumnsResult = await SQLClient.query(validColumnsQuery);
  const validColumns = validColumnsResult.rows.map(row => row.column_name);

  if (!validColumns.includes(column)) {
    throw new Error('Invalid column name');
  }

  const {rows} = await SQLClient.query(`
    WITH car_key_page AS (
      SELECT c.*, v.model FROM car_key c JOIN vehicle v ON v.id = c.car_id
      ORDER BY ${column} LIMIT 10 OFFSET ($1 - 1) * 10) 
    SELECT * FROM car_key_page`, [iPage]);
  return rows;
}

export const keysCount = async(SQLClient) => {
  const {rows} = await SQLClient.query(`SELECT COUNT(*) FROM car_key`);
  return rows[0]?.count;
}

export const getSearchCarKeys = async(SQLClient, {iPage}, {value}, {column}) => {
  const validColumnsQuery = `
  (SELECT column_name
  FROM information_schema.columns
  WHERE table_name = 'car_key')
  UNION ALL
  (SELECT column_name
  FROM information_schema.columns
  WHERE table_name = 'vehicle' AND column_name = 'model')
`;

const validColumnsResult = await SQLClient.query(validColumnsQuery);
const validColumns = validColumnsResult.rows.map(row => row.column_name);

if (!validColumns.includes(column)) {
  throw new Error('Invalid column name');
}

  const {rows} = await SQLClient.query(
    `WITH car_key_page AS (
      SELECT c.*, v.model FROM car_key c JOIN vehicle v ON c.car_id = v.id
      WHERE v.model ILIKE '%'||$2||'%'
      ORDER BY ${column} LIMIT 10 OFFSET ($1 - 1) * 10) 
    SELECT * from car_key_page`, 
    [iPage, value]
  );
  return rows;
}

export const keysSearchCount = async(SQLClient, {value}) => {
  const {rows} = await SQLClient.query(`SELECT COUNT(*) FROM car_key c JOIN vehicle v ON c.car_id = v.id WHERE v.model ILIKE '%'||$1||'%'`, [value]);
  return rows[0]?.count;
}

export const addCarKey = async(SQLClient, {carId}) => {
    const {rows} = await SQLClient.query(`INSERT INTO car_key(car_id) VALUES ($1) RETURNING id`, [carId]);
    return rows[0]?.id;
}

export const updateCarKey = async(SQLClient, {id, carId}) => {
  return await SQLClient.query(`UPDATE car_key SET car_id = $1 WHERE id = $2`, [carId, id]);
}

export const deleteCarKeys = async(SQLClient, {idList}) => {
  return await SQLClient.query(`DELETE FROM car_key WHERE id = ANY($1)`, [idList]);
}
