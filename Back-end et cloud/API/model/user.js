export async function getUserByEmail(SQLClient, {email}){
    const {rows} = await SQLClient.query("SELECT * FROM user WHERE email = $1", [email]);
    return rows[0];
}
export async function getUserByReferralCode(SQLClient, {referralCode}){
  const {rows} = await SQLClient.query("SELECT id FROM user WHERE referral_code = $1", [referralCode]);
  return rows[0];
}

export async function deleteUsers(SQLClient, {idList}){
    return await SQLClient.query("DELETE * FROM user WHERE id IN ($1)", [idList]);
}

export async function addUser(SQLClient, {firstName, lastName, email, phoneNumber, password, birthday, subscription, startingSubscriptionDate, balance, hasCarLicense, hasMotorbikeLicense}){
    const {rows} = await SQLClient.query("INSERT INTO user (first_name, last_name, email, phone_number, password, birthday, subscription, starting_subscription_date, balance, has_car_license, has_motorbike_license)" + 
        " VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id",
      [
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        birthday,
        subscription,
        startingSubscriptionDate,
        balance,
        hasCarLicense,
        hasMotorbikeLicense
      ]);
    return rows[0]?.id;
}

export async function updateUser(SQLClient, {id, firstName, lastName, email, phoneNumber, password, birthday, subscription, startingSubscriptionDate, balance, hasCarLicense, hasMotorbikeLicense}){
    let query = `UPDATE user SET `;
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
    if (subscription){
    queryValues.push(subscription);
    querySet.push(`subscription = $${queryValues.length}`)
    }
    if (startingSubscriptionDate){
    queryValues.push(startingSubscriptionDate);
    querySet.push(`starting_subscription_date = $${queryValues.length}`)
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
    if(queryValues.length > 0){
        queryValues.push(id);
        query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error("No field given");
    }
}

export async function registration(SQLClient, {firstName, lastName, email, phoneNumber, password, birthday, hasCarLicense, hasMotorbikeLicense}){
  const {rows} = await SQLClient.query(
    "INSERT INTO user (first_name, last_name, email, phone_number, password, birthday, has_car_license, has_motorbike_license) " +
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