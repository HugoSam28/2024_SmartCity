export async function getClientByEmail(SQLClient, {email}){
    const {rows} = await SQLClient.query("SELECT * FROM client WHERE email = $1", [email]);
    return rows[0];
}

export async function deleteClientByID(SQLClient, {idList}){
    return await SQLClient.query("DELETE * FROM client WHERE id IN ($1)", [idList]);
}

export async function addClient(SQLClient, {firstName, lastName, email, phoneNumber, password, birthday, subscription, startingSubscriptionDate, balance, hasCarLicense, hasMotorbikeLicense}){
    const {rows} = await SQLClient.query("INSERT INTO client (first_name, last_name, email, phone_number, password, birthday, subscription, starting_subscription_date, balance, has_car_license, has_motorbike_license)" + 
        " VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11", [firstName, lastName, email, phoneNumber, password, birthday, subscription, startingSubscriptionDate, balance, hasCarLicense, hasMotorbikeLicense]);
        return rows[0]?.id;
    }

export async function updateClient(SQLClient, {id, firstName, lastName, email, phoneNumber, password, birthday, subscription, startingSubscriptionDate, balance, hasCarLicense, hasMotorbikeLicense}){
    let query = `UPDATE client SET `;
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