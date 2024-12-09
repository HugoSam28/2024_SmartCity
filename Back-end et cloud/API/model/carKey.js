export const getAllCarKeys= async(SQLClient, {iPage}) => {
    const {rows} = await SQLClient.query("WITH Car_key AS ( " +
      "SELECT * FROM Car_key" +
      "ORDER BY id LIMIT 10 OFFSET ($1 - 1) * 10) "+
      "SELECT * FROM Car_key", [iPage]);
    
    return rows;
}

export const addCarKey = async(SQLClient, {carId}) => {
    const {rows} = await SQLClient.query("INSERT INTO Car_key(car_id) VALUES ($1) RETURNING id", [carId]);
    return rows[0]?.id;
}

export const updateCarKey = async(SQLClient, {id, newCarId}) => {
    if(newCarId){
        return await SQLClient.query("UPDATE Car_key SET car_id = $1 WHERE id = $2", [id, newCarId]);
    }
    throw new Error("No filed given");
}

export const deleteCarKeys = async(SQLClient, {idList}) => {
    return await SQLClient.query('DELETE FROM Car_key WHERE id IN $1', [idList]);
}


