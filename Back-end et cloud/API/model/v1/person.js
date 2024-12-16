import * as util from "../../util/argon.js"


export const addPerson = async(SQLClient, {firstName, lastName, email, phoneNumber, password, birthday, hasCarLicence, hasMotorbikeLicence}) =>{
  const hashedPassword = await util.hash(password)
  const {rows} = await SQLClient.query(
    `INSERT INTO Person (first_name, last_name, email, phone_number, password, birthday, has_car_licence, has_motorbike_licence)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      firstName,
      lastName,
      email,
      phoneNumber,
      hashedPassword,
      birthday,
      hasCarLicence,
      hasMotorbikeLicence
    ]);
  return rows[0]?.id;
}

export const getPersonByReferralCode = async(SQLClient, referralCode) =>{
  const {rows} = await SQLClient.query(`SELECT id FROM Person WHERE referral_code = $1`, [referralCode]);
  if(rows[0]?.id !== undefined) {
    return rows[0].id;
  }
  throw new Error(`No user found for referral code: ${referralCode}`);
}

export const getPersonByEmail = async(SQLClient, email) =>{
  const {rows} = await SQLClient.query(`SELECT id, password, email, role FROM Person WHERE email = $1`, [email]);
  return rows[0];
}


export const getPersonById = async(SQLClient,id) => {
  const {rows} = await SQLClient.query(`SELECT first_name, last_name, email, phone_number, birthday, has_car_licence, has_motorbike_licence FROM Person WHERE id = $1`, [id]);
  return rows[0];
}

export const getProfileInfosById = async(SQLClient, id) =>{
  const {rows} = await SQLClient.query(`SELECT first_name, last_name, balance, referral_code FROM Person WHERE id = $1`, [id]);
  return rows[0];
}

export const getAllPersons = async(SQLClient, {iPage}, {column}) => {
  const {rows} = await SQLClient.query(`
    WITH Person_page AS (
      SELECT id, first_name, last_name, email, phone_number, role, balance, has_car_licence, has_motorbike_licence, referral_code FROM Person
      ORDER BY $2 LIMIT 10 OFFSET ($1 - 1) * 10)
    SELECT * FROM Person_page;`, [iPage, column]);
  return rows;
}

export const personsCount = async(SQLClient) => {
  const {rows} = await SQLClient.query(`SELECT COUNT(*) FROM Person`);
  return rows[0]?.count;
}

export const getSearchPersons = async(SQLClient, {iPage}, {value}, {column}) => {
  const {rows} = await SQLClient.query(`
    WITH Person_page AS (
      SELECT id, first_name, last_name, email, phone_number, role, balance, has_car_licence, has_motorbike_licence, referral_code FROM Person
      ORDER BY $3 LIMIT 10 OFFSET ($1 - 1) * 10)
      WHERE (first_name ILIKE '%$2%' OR last_name ILIKE '%$2%')
    SELECT * FROM Person_page`, [iPage, value, column]);
  return rows;
}

export const personsSearchCount = async(SQLClient, {value}) => {
  const {rows} = await SQLClient.query(`SELECT COUNT(*) FROM Person WHERE (first_name ILIKE '%$1%' OR last_name ILIKE '%$1%')`, [value]);
  return rows[0]?.count;
}

export const updateMySelf = async(SQLClient, {id, firstName, lastName, email, phoneNumber, password, hasCarlicence, hasMotorbikelicence}) => {
  let query = `UPDATE Person SET `;
  const querySet = [];
  const queryValues = [];
  if (firstName) {
      queryValues.push(firstName);
      querySet.push(`first_name = $${queryValues.length}`);
  }
  if (lastName){
      queryValues.push(lastName);
      querySet.push(`last_name = $${queryValues.length}`)
  }
  if (email){
      queryValues.push(email);
      querySet.push(`email = $${queryValues.length}`)
  }
  if (phoneNumber){
      queryValues.push(phoneNumber);
      querySet.push(`phone_number = $${queryValues.length}`)
  }
  if (password){
      queryValues.push(await util.hash(password));
      querySet.push(`password = $${queryValues.length}`)
  }
  if (hasCarlicence){
      queryValues.push(hasCarlicence);
      querySet.push(`has_car_licence = $${queryValues.length}`)
  }
  if (hasMotorbikelicence){
      queryValues.push(hasMotorbikelicence);
      querySet.push(`has_motorbike_licence = $${queryValues.length}`)
  }
  if(queryValues.length > 0){
      queryValues.push(id);
      query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
      return await SQLClient.query(query, queryValues);
  } else {
      throw new Error(`No field given`);
  }
}

export async function updatePerson(SQLClient, {id, firstName, lastName, email, phoneNumber, password, role, birthday, balance, hasCarlicence, hasMotorbikelicence, referralCode}){
  let query = `UPDATE Person SET `;
  const querySet = [];
  const queryValues = [];
  if (firstName) {
      queryValues.push(firstName);
      querySet.push(`first_name = $${queryValues.length}`);
  }
  if (lastName){
      queryValues.push(lastName);
      querySet.push(`last_name = $${queryValues.length}`)
  }
  if (email){
      queryValues.push(email);
      querySet.push(`email = $${queryValues.length}`)
  }
  if (phoneNumber){
      queryValues.push(phoneNumber);
      querySet.push(`phone_number = $${queryValues.length}`)
  }
  if (password){
      queryValues.push(await util.hash(password));
      querySet.push(`password = $${queryValues.length}`)
  }
  if (role){
    queryValues.push(role);
    querySet.push(`role = $${queryValues.length}`)
  }
  if (birthday){
      queryValues.push(birthday);
      querySet.push(`birthday = $${queryValues.length}`)
  }
  if (balance){
  queryValues.push(balance);
  querySet.push(`balance = $${queryValues.length}`)
  }
  if (hasCarlicence){
      queryValues.push(hasCarlicence);
      querySet.push(`has_car_licence = $${queryValues.length}`)
  }
  if (hasMotorbikelicence){
      queryValues.push(hasMotorbikelicence);
      querySet.push(`has_motorbike_licence = $${queryValues.length}`)
  }
  if(referralCode){
    queryValues.push(referralCode);
    querySet.push(`referral_code = $${queryValues.length}`)
  }
  if(queryValues.length > 0){
      queryValues.push(id);
      query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
      return await SQLClient.query(query, queryValues);
  } else {
      throw new Error("No field given");
  }
}

export const updatePersonalBalance = async(SQLClient, {id, value}) => {
  return await SQLClient.query(`UPDATE Person SET balance = balance + $1 WHERE id = $2 RETURNING balance`, [(value > 0 ? value : value * -1), id]);
}

export const deletePersons = async(SQLClient, {idList}) => {
  return await SQLClient.query(`DELETE FROM Person WHERE id = ANY($1)`, [idList]);
}


