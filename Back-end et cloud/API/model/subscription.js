
export const getAllSubscriptions = async(SQLClient, {iPage}) => { // admin
  
  const {rows} = await SQLClient.query(`WITH Subscription AS (
    SELECT * FROM Subscription
    ORDER BY id LIMIT 10 OFFSET (:$1 - 1) * 10)
    SELECT * FROM Subscription`, [iPage]);

  return rows;
}

export const getSubscriptionById = async(SQLClient, {id}) => {
  const {rows} = await SQLClient.query(`SELECT * FROM subscription WHERE ID = $1`, [id]);
  return rows[0];
}

export const addSubscription = async(SQLClient, {label, price, paymentRecurrence, discount}) => {
  const {rows} = await SQLClient.query(`INSERT INTO subscription(label, price, payment_recurrence, discount) VALUES
    ($1, $2, $3, $4) RETURNING id`, label, price, paymentRecurrence, discount);
    return rows[0]?.id;
}

export const updateSubscription = async(SQLClient, {id, label, price, paymentRecurrence, discount}) => {
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
  if(paymentRecurrence){
  queryValues.push(paymentRecurrence);
  querySet.push(`payment_recurrence = $${queryValues.length}`);
  }
  if(discount){
  queryValues.push(discount);
  querySet.push(`discount = $${queryValues.length}`);
  }
  if(queryValues.length > 0){
      queryValues.push(id);
      query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
      return await SQLClient.query(query, queryValues);
  } else {
      throw new Error(`No field given`);
  }
}

export const deleteSubscriptions = async(SQLClient, {idList}) => {
  const query = `DELETE FROM subscription WHERE id = ANY($1)`;
  const idArray = idList.split(',').map(Number);
  return await SQLClient.query(query, [idArray]);
}
