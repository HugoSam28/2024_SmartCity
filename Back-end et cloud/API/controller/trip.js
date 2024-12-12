import {pool} from "../database/database.js";
import * as tripModel from "../model/trip.js";
import * as vehicleModel from "../model/vehicle.js";

export const getAllTrips = async (req, res) => {//admin
  try{
    const trips = await tripModel.getAllTrips(pool, req.val.page, req.val.order);
    if(trips){
        res.sendStatus(200).send(trips);
    }
    else{
        res.sendStatus(404);
    }
  }
  catch(e){
      console.error(e);
      res.sendStatus(500);
  }
}

export const getAllTripsAndPagesCount = async (req, res) => {
  try{
    const result = {};
    result.trips = await tripModel.getAllTrips(pool, req.val.page, req.val.order);
    result.nbPagesTrips = Math.ceil((await tripModel.tripsCount(pool))/10);
    if(result.trips && result.nbPagesTrips){
        res.sendStatus(200).send(result);
    }
    else{
        res.sendStatus(404);
    }
}
catch(e){
    console.error(e);
    res.sendStatus(500);
}
}

export const getSearchTrips = async (req, res) => {
  try{
    const result = {};
    result.trips = await tripModel.getSearchTrips(pool, req.val.page, req.val.search, req.val.order);
    result.nbPagesTrips = Math.ceil((await tripModel.tripsSearchCount(pool, req.val.search))/10);
    if(result.trips && result.nbPagesTrips){
        res.sendStatus(200).send(result);
    }
    else{
        res.sendStatus(404);
    }
}
catch(e){
    console.error(e);
    res.sendStatus(500);
}
}

export const getOwnTrips = async (req, res) => {
  try{
      const {rows} = await tripModel.getOwnTrips(pool, req.val);
      if(rows){
          res.sendStatus(200).send(rows)
      }else{
          res.sendStatus(404);
      }
  } catch (e){
      console.error(e)
      res.sendStatus(500);
  }
}

export const startTrip = async (req, res) => {
  let SQLClient;
  try {
    SQLClient = await pool.connect();
    await SQLClient.query("BEGIN");
    const idTrip = await tripModel.startTrip(SQLClient, req.val);
    await vehicleModel.updateStatus(SQLClient, req.val);
    await SQLClient.query("COMMIT");
    res.sendstatus(201).send(idTrip);
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

export const endTrip = async(req, res) => {
  let SQLClient;
  try{
    SQLClient = await pool.connect();
    await SQLClient.query("BEGIN");
    await tripModel.endTrip(SQLClient, req.val); //
    await vehicleModel.updateStatus(SQLClient, req.val);
    await SQLClient.query("COMMIT");
    res.sendStatus(200);
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

export const addTrip = async (req, res) => {
  try{
    const result= {};
    result.id = await sponsoringModel.addSponsoring(pool, req.val);
    result.sponsorings = await sponsoringModel.getAllSponsorings(pool, req.val.page, req.val.order);
    result.nbPagesSponsorings = Math.ceil((await sponsoringModel.sponsoringsCount(pool))/10);
    if(result.id && result.sponsorings && result.nbPagesSponsorings){
        res.status(201).send(result);
    }
    else{
        res.sendStatus(404);
    }
  }
  catch(e){
      console.error(e);
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

export const deleteTrips = async (req, res) => {
    try {
        await tripModel.deleteTrips(pool, req.val);
        res.sendStatus(204);
    } catch (e) {
        console.error(e)
        res.sendStatus(500);
    }
}





