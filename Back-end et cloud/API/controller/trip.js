import {pool} from "../database/database.js";
import * as tripModel from "../model/trip.js";
import * as vehicleModel from "../model/vehicle.js";

export const getAllTrips = async (req, res) => {//admin
    try{
        const trips = await tripModel.getAllTrips(pool, req.val);
        if(trips){
            res.send(trips)
        }else{
            res.sendStatus(404);
        }
    } catch (e){
        console.error(e)
        res.sendStatus(500);
    }
}

export const getOwnTrips = async (req, res) => {
    try{
        const {rows} = await tripModel.getOwnTrips(pool, req.session.id);
        if(rows){
            res.send(rows)
        }else{
            res.sendStatus(404);
        }
    } catch (e){
        console.error(e)
        res.sendStatus(500);
    }
}

export const updateTrip = async (req, res) => {
    try{
        await tripModel.updateTrip(pool, req.session.id, req.val);
        res.sendStatus(204);
    } catch (e){
        console.error(e)
        res.sendStatus(500);
    }
}

export const addTrip = async (req, res) => {
    try{
        const id = await tripModel.addTrip(pool, req.val);
        res.status(201).send(id);
    } catch (e){
        console.error(e)
        res.sendStatus(500);
    }
}


export const deleteTrips = async (req, res) => {
    try {
        await tripModel.deleteTrips(pool, req.val);
        res.sendStatus(204);
    } catch (e) {
        console.error(e)
        res.sendStatus(500);
    }
}

export const startTrip = async (req, res) => {
  let SQLClient;
  try {
    SQLClient = await pool.connect();
    await SQLClient.query("BEGIN");
    const idTrip = await tripModel.startTrip(pool, req.val);
    await vehicleModel.updateStatus(SQLClient, req.val.vehicleId);
    await SQLClient.query("COMMIT");
    res.sendstatus(201);
  } catch (error) {
    console.error(error);
    try {
      if(SQLClient){
        await SQLClient.query('ROLLBACK');
      }
    } catch (err) {
      console.error(err);
    } finally {
      res.sendStatus(500);
    }
  } finally {
    if(SQLClient){
      SQLClient.release();
    }
  }
}

export const getAllTripsAndPagesCount = async (req, res) => {
  try{
    const result = {};
    const trips = await tripModel.getAllTrips(pool, req.val.page);
    const nbPagesTrip = Math.ceil((await tripModel.tripsCount(pool))/10);

    result.trips = trips;
    result.nbPagesTrip = nbPagesTrip;
    
    if(result.trips && result.nbPagesTrip){
      res.send(result);
    }else{
        res.sendStatus(404);
    }
  }
  catch(e){
    console.error(e)
    res.sendStatus(500);
  }
}

export const getSearchTrips = async (req, res) => {
  try{
    const result = {};
    const trips = await tripModel.getSearchTrips(pool, req.val.search, req.val.page);
    const nbPagesTrip = Math.ceil((await tripModel.tripsSearchCount(pool, req.val.search))/10);

    result.trips = trips;
    result.nbPagesTrip = nbPagesTrip;

    if(result.trips && result.nbPagesTrip){
      res.send(result);
    }else{
        res.sendStatus(404);
    }
  }
  catch(e){
    console.error(e)
    res.sendStatus(500);
  }
}