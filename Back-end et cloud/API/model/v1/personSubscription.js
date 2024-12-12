export const getAllPersonSubscriptions = async(SQLClient, {iPage}, {column}) => {
  const {rows} = await SQLClient.query(`
    WITH personSubscription_page AS (
      SELECT pS.*, p.mail, s.label FROM personSubscription pS JOIN Person p ON p.id = pS.person_id
      JOIN subscription s ON pS.subscription_id = s.id
      ORDER BY $2 LIMIT 10 OFFSET ($1 - 1) * 10)
    SELECT * from personSubscription_page`, [iPage, column]);
  return rows;
}

export const personSubscriptionsCount = async(SQLClient) => {
  const {rows} = await SQLClient.query(`SELECT COUNT(*) FROM PersonSubscription`);
  return rows[0]?.count;
}

export const getSearchPersonSubscriptions = async(SQLClient, {iPage}, {value}, {column}) => {
  const {rows} = await SQLClient.query(`
    WITH Subscription_page AS (
      SELECT pS.*, p.mail, s.label FROM personSubscription_page pS JOIN Person p ON p.id = pS.person_id
      JOIN subscription s ON pS.subscription_id = s.id
      WHERE (p.email ILIKE '%$2%' OR s.label ILIKE '%$2%')
      ORDER BY $2 LIMIT 10 OFFSET ($1 - 1) * 10) 
    SELECT * FROM PersonSubscription_page`, [iPage, value, column]);
  return rows;
}

export const personSubscriptionsSearchCount = async(SQLClient, {value}) => {
  const {rows} = await SQLClient.query(`SELECT COUNT(*) FROM personSubscription_page pS JOIN Person p ON p.id = pS.person_id
    JOIN subscription s ON pS.subscription_id = s.id WHERE (p.email ILIKE '%$1%' OR s.label ILIKE '%$1%')`, [value]);
  return rows[0]?.count;
}

export const getOwnSubscription = async(SQLClient, {id}) => {
  const {rows} = await SQLClient.query(`SELECT subscription_id FROM person_subscription WHERE person_id = $1`, [id]);
  return rows; [1,2,8]
}

export const addOwnSubscription = async(SQLClient, {personID, subscriptionId, starting_subscription_date}) => {
  await SQLClient.query(`INSERT INTO Person_subscription(person_id, subscription_id, starting_subscription_date) VALUES ($1, $2, $3) RETURNING id`, [personId, subscriptionId, starting_subscription_date])
}

export const addPersonSubscription = async(SQLClient, {personId, subscriptionId, starting_subscription_date}) => {
  const {rows} = await SQLClient.query(`INSERT INTO Person_subscription (person_id, subscription_id, starting_subscription_date)
     SELECT $1, $2, $3
     WHERE NOT EXISTS (
       SELECT 1 FROM Person_subscription WHERE person_id = $1 AND subscription_id = $2
     )
     RETURNING id`, [personId, subscriptionId, starting_subscription_date]);
  return rows[0];
}

export const updatePersonSubscription = async(SQLClient, {id, personId, subscriptionId, starting_subscription_date}) =>{
  let query = `UPDATE Person_subscription SET `;
  const querySet = [];
  const queryValues = [];
  if(personId){
    queryValues.push(personId);
    querySet.push(`person_id = $${queryValues.length}`);
  }
  if(subscriptionId){
    queryValues.push(subscriptionId);
    querySet.push(`subscription_id = $${queryValues.length}`);
  }
  if(starting_subscription_date){
    queryValues.push(starting_subscription_date);
    querySet.push(`starting_subscription_date = $${queryValues.length}`);
  }
  if(queryValues.length > 0){
      queryValues.push(id);
      query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
      return await SQLClient.query(query, queryValues);
  } else {
      throw new Error("No field given");
  }
}

export const deletePersonSubscription = async(SQLClient, {idList}) => {
  return await SQLClient.query(`DELETE FROM Person_subscription WHERE id = ANY($1)`, [idList]);
}
