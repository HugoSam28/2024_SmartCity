export async function getKey(SQLClient, {id}) {
    const {rows} = await SQLIClient.query("SELECT * FROM car_key WHERE id = $1", [id]);
    return rows[0];
}

export const addKey = async (SQLClient, {carId}) => {
    const {rows} = await SQLClient.query(
        'INSERT INTO car_key(car_id) VALUES ($1) RETURNING id', [carId]);
    return rows[0]?.id;
}

export const updateKey = async (id, newCarId) => {
    if (newCarId){
        return await SQLClient.query(
            'UPDATE car_key SET car_id = $2 WHERE id = $1', [newCarId, id]);
    }
    throw new Error("No field given");
}

export const deleteKey = async (idList) => {
    return await SQLClient.query(
        'DELETE FROM car_key WHERE id IN $1', [idList]);
};


