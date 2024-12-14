export const getAllSubscriptions = async(SQLClient, {iPage}, {column}) => {
  const {rows} = await SQLClient.query(`
    WITH Subscription_page AS (
      SELECT * FROM Subscription
      ORDER BY $2 LIMIT 10 OFFSET ($1 - 1) * 10) 
    SELECT * FROM Subscription_page`, [iPage, column]);
  return rows;
}

export const subscriptionsCount = async(SQLClient) => {
  const {rows} = await SQLClient.query(`SELECT COUNT(*) FROM Subscription`);
  return rows[0]?.count;
}

export const getSearchSubscriptions = async(SQLClient, {iPage}, {value}, {column}) => {
  const {rows} = await SQLClient.query(`
    WITH Subscription_page AS (
      SELECT * FROM Subscription
      WHERE (label ILIKE '%$2%' OR vehicule_type ILIKE '%$2%')
      ORDER BY $3 LIMIT 10 OFFSET ($1 - 1) * 10) 
    SELECT * FROM Subscription_page`, [iPage, value, column]
  );
  return rows;
}

export const subscriptionsSearchCount = async(SQLClient, {value}) => {
  const {rows} = await SQLClient.query(`SELECT COUNT(*) FROM Subscription WHERE (label ILIKE '%$1%' OR vehicule_type ILIKE '%$1%')`, [value]);
  return rows[0]?.count;
}

export const addSubscription = async(SQLClient, {label, price, discount, paymentRecurrence, vehicleType}) => {
    const {rows} = await SQLClient.query(`INSERT INTO Subscription(label, price, discount, payment_recurrence, vehicle_type) VALUES ($1, $2, $3, $4, $5) RETURNING id`, [label, price, discount, paymentRecurrence, vehicleType]);
    return rows[0]?.id;
}

export const updateSubscription = async(SQLClient, {id, label, price, discount, paymentRecurrence, vehicleType}) =>{
  let query = `UPDATE Subscription SET `;
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
  return await SQLClient.query(`DELETE FROM Car_key WHERE id = ANY($1)`, [idList]);
}

export const getOthersSubscription = async(SQLClient, ownRows) => {
  const {rows} = await SQLClient.query(`SELECT * FROM Subscription WHERE id != ANY($1)`,[ownRows]);
  return rows;
}

export const getOwnSubscription = async(SQLClient, ownRows) => {
  const {rows} = await SQLClient.query(`SELECT * FROM Subscription WHERE id = ANY($1)`, [ownRows]);
  return rows;
}