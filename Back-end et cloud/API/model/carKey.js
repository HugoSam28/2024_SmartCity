export const getAllCarKeys= async(SQLClient, {iPage}, {column}) => {
  const {rows} = await SQLClient.query(`WITH Car_key_page AS (
    SELECT * FROM Car_key
    ORDER BY $2 LIMIT 10 OFFSET ($1 - 1) * 10) 
    SELECT c.*, v.model FROM Car_key_page c JOIN With_licence v ON v.id = c.car_id
    ORDER BY $2`, [iPage, column]);
  return rows;
}

export const keysCount = async(SQLClient) => {
  const {rows} = await SQLClient.query(`SELECT COUNT(*) FROM Car_key`);
  return rows[0]?.count;
}

export const getSearchCarKeys = async(SQLClient, {iPage}, {value}, {column}) => {
  const {rows} = await SQLClient.query(
    `WITH Car_key_page AS (SELECT * FROM Car_key
    ORDER BY $3 LIMIT 10 OFFSET ($1 - 1) * 10) 
    SELECT c.*, v.model FROM Car_key c JOIN With_licence v ON c.car_id = v.id
    WHERE v.model ILIKE '%$2%'
    ORDER BY $3`, 
    [iPage, value, column]
  );
  return rows;
}

export const keysSearchCount = async(SQLClient, {value}) => {
  const {rows} = await SQLClient.query(`SELECT COUNT(*) FROM Car_key c JOIN With_licence v ON c.car_id = v.id WHERE v.model ILIKE %$1%`, [value]);
  return rows[0]?.count;
}

export const addCarKey = async(SQLClient, {carId}) => {
    const {rows} = await SQLClient.query(`INSERT INTO Car_key(car_id) VALUES ($1) RETURNING id`, [carId]);
    return rows[0]?.id;
}

export const updateCarKey = async(SQLClient, {id, newCarId}) => {
  return await SQLClient.query(`UPDATE Car_key SET car_id = $1 WHERE id = $2`, [newCarId, id]);
}

export const deleteCarKeys = async(SQLClient, {idList}) => {
  return await SQLClient.query(`DELETE FROM Car_key WHERE id = ANY($1)`, [idList]);
}
