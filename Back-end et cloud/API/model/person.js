export const getPersonById = async(SQLClient,{id}) => {
  const {rows} = await SQLClient.query("SELECT * FROM Person WHERE id = $1", [id]);
  return rows[0];
}

export const getAllPersons = async(SQLClient, {iPage}) => {
  const {rows} = await SQLClient.query("WITH Person AS ( " +
    "SELECT * FROM Person" +
    "ORDER BY id LIMIT 10 OFFSET ($1 - 1) * 10) "+
    "SELECT * FROM Person", [iPage]);
  return rows;
}

export async function updatePerson(SQLClient, {id, firstName, lastName, email, phoneNumber, password, birthday, balance, hasCarLicense, hasMotorbikeLicense, referralCode}){
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
      queryValues.push(password);
      querySet.push(`password = $${queryValues.length}`)
  }
  if (birthday){
      queryValues.push(birthday);
      querySet.push(`birthday = $${queryValues.length}`)
  }
  if (balance){
  queryValues.push(balance);
  querySet.push(`balance = $${queryValues.length}`)
  }
  if (hasCarLicense){
      queryValues.push(hasCarLicense);
      querySet.push(`has_car_license = $${queryValues.length}`)
  }
  if (hasMotorbikeLicense){
      queryValues.push(hasMotorbikeLicense);
      querySet.push(`has_motorbike_license = $${queryValues.length}`)
  }
  if (referralCode){
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

export async function deletePersons(SQLClient, {idList}){
  return await SQLClient.query("DELETE * FROM Person WHERE id IN ($1)", [idList]);
}

export async function getPersonByEmail(SQLClient, {email}){
  const {rows} = await SQLClient.query("SELECT * FROM Person WHERE email = $1", [email]);
  return rows[0];
}

export async function addPerson(SQLClient, {firstName, lastName, email, phoneNumber, password, birthday, hasCarLicense, hasMotorbikeLicense}){
  const {rows} = await SQLClient.query(
    "INSERT INTO Person (first_name, last_name, email, phone_number, password, birthday, has_car_license, has_motorbike_license) " +
    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
    [
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      birthday,
      hasCarLicense,
      hasMotorbikeLicense
    ]);
  return rows[0]?.id;
}

export async function getPersonByReferralCode(SQLClient, {referralCode}){
const {rows} = await SQLClient.query("SELECT id FROM Person WHERE referral_code = $1", [referralCode]);
return rows[0]?.id;
}