export const getAllSubscriptions = async(SQLClient, {iPage}, {column}) => {
  const validColumnsQuery = `
  SELECT column_name
  FROM information_schema.columns
  WHERE table_name = 'subscription'
`;

const validColumnsResult = await SQLClient.query(validColumnsQuery);
const validColumns = validColumnsResult.rows.map(row => row.column_name);

if (!validColumns.includes(column)) {
  throw new Error('Invalid column name');
}

  const {rows} = await SQLClient.query(`
    WITH subscription_page AS (
      SELECT * FROM subscription
      ORDER BY ${column} LIMIT 10 OFFSET ($1 - 1) * 10) 
    SELECT * FROM subscription_page`, [iPage]);
  return rows;
}

export const subscriptionsCount = async(SQLClient) => {
  const {rows} = await SQLClient.query(`SELECT COUNT(*) FROM subscription`);
  return rows[0]?.count;
}

export const getSearchSubscriptions = async(SQLClient, {iPage}, {value}, {column}) => {
  const validColumnsQuery = `
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'subscription'
  `;

  const validColumnsResult = await SQLClient.query(validColumnsQuery);
  const validColumns = validColumnsResult.rows.map(row => row.column_name);

  if (!validColumns.includes(column)) {
    throw new Error('Invalid column name');
  }
  const {rows} = await SQLClient.query(`
    WITH subscription_page AS (
      SELECT * FROM subscription
      WHERE (label ILIKE '%'||$2||'%' OR vehicle_type ILIKE '%'||$2||'%')
      ORDER BY ${column} LIMIT 10 OFFSET ($1 - 1) * 10) 
    SELECT * FROM subscription_page`, [iPage, value]
  );
  return rows;
}

export const subscriptionsSearchCount = async(SQLClient, {value}) => {
  const {rows} = await SQLClient.query(`SELECT COUNT(*) FROM subscription WHERE (label ILIKE '%'||$1||'%' OR vehicle_type ILIKE '%'||$1||'%')`, [value]);
  return rows[0]?.count;
}

export const addSubscription = async(SQLClient, {label, price, discount, paymentRecurrence, vehicleType}) => {
    const {rows} = await SQLClient.query(`INSERT INTO subscription(label, price, discount, payment_recurrence, vehicle_type) VALUES ($1, $2, $3, $4, $5) RETURNING id`, [label, price, discount, paymentRecurrence, vehicleType]);
    return rows[0]?.id;
}

export const updateSubscription = async(SQLClient, {id, label, price, discount, paymentRecurrence, vehicleType}) =>{
  let query = `UPDATE subscription SET `;
  const querySet = [];
  const queryValues = [];
  if(label){
    queryValues.push(label);
    querySet.push(`label = $${queryValues.length}`);
  }
  if(price){
    queryValues.push(price);
    querySet.push(`price = $${queryValues.length}`);
  }
  if(discount){
    queryValues.push(discount);
    querySet.push(`discount = $${queryValues.length}`);
  }
  if(paymentRecurrence){
    queryValues.push(paymentRecurrence);
    querySet.push(`payment_recurrence = $${queryValues.length}`);
  }
  if(vehicleType){
    queryValues.push(vehicleType);
    querySet.push(`vehicle_type = $${queryValues.length}`);
  }
  if(queryValues.length > 0){
      queryValues.push(id);
      query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
      return await SQLClient.query(query, queryValues);
  } else {
      throw new Error("No field given");
  }
}

export const deleteSubscriptions = async(SQLClient, {idList}) => {
  return await SQLClient.query(`DELETE FROM car_key WHERE id = ANY($1)`, [idList]);
}

export const getOthersSubscription = async(SQLClient, ownRows) => {
  const {rows} = await SQLClient.query(`SELECT * FROM subscription WHERE id != ALL($1)`,[ownRows]);
  return rows;
}

export const getOwnSubscription = async(SQLClient, ownRows) => {
  const {rows} = await SQLClient.query(`SELECT * FROM subscription WHERE id = ANY($1)`, [ownRows]);
  return rows;
}