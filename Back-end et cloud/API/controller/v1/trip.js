import {pool} from "../../database/database.js";
import * as tripModel from "../../model/v1/trip.js";
import * as vehicleModel from "../../model/v1/vehicle.js";

export const getAllTrips = async (req, res) => {
  try{
    const trips = await tripModel.getAllTrips(pool, req.val.page, req.val.order);
    if(trips){
        res.send(trips);
    }
    else{
        res.sendStatus(404);
    }
  }
  catch(e){
    res.status(500).send(e.messages);
  }
}

export const getAllTripsAndPagesCount = async (req, res) => {
  try{
    const result = {};
    result.trips = await tripModel.getAllTrips(pool, req.val.page, req.val.order);
    result.nbPagesTrips = Math.ceil((await tripModel.tripsCount(pool))/10);
    if(result.trips && result.nbPagesTrips){
        res.send(result);
    }
    else{
        res.sendStatus(404);
    }
  }
  catch(e){
    res.status(500).send(e.message);
  }
}

export const getSearchTrips = async (req, res) => {
  try{
    const result = {};
    result.trips = await tripModel.getSearchTrips(pool, req.val.page, req.val.search, req.val.order);
    result.nbPagesTrips = Math.ceil((await tripModel.tripsSearchCount(pool, req.val.search))/10);
    if(result.trips[0] && result.nbPagesTrips){
        res.send(result);
    }
    else{
        res.sendStatus(404);
    }
  }
  catch(e){
    res.status(500).send(e.message);
  }
}

export const getOwnTrips = async (req, res) => {
  try{
      const {rows} = await tripModel.getOwnTrips(pool, req.val);
      if(rows){
          res.send(rows)
      }else{
          res.sendStatus(404);
      }
  } catch (e){
    res.status(500).send(e.message);
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
    res.send(idTrip);
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
    const vehicleId = await tripModel.endTrip(SQLClient, req.val);
    const trip = await tripModel.getTripById(SQLClient, req.val);
    await vehicleModel.updateStatus(SQLClient, vehicleId);
    const vehicle = await vehicleModel.getVehicleById(SQLClient, vehicleId);

    const cost = ((trip.ending_date - trip.starting_date) / 60000) * vehicle.price + vehicle.fees;
    await tripModel.updateTrip(SQLClient, {cost});
    await SQLClient.query("COMMIT");
    res.sendStatus(204);
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
    result.id = await tripModel.addTrip(pool, req.val);
    result.trips = await tripModel.getAllTrips(pool, req.val.page, req.val.order);
    result.nbPagesTrips = Math.ceil((await tripModel.tripsCount(pool))/10);
    if(result.id && result.trips && result.nbPagesTrips){
        res.send(result);
    }
    else{
        res.sendStatus(404);
    }
  }
  catch(e){
    res.status(500).send(e.message);
  }
}

export const updateTrip = async (req, res) => {
    try{
        await tripModel.updateTrip(pool, req.val);
        const trips = await tripModel.getAllTrips(pool, req.val.page, req.val.order)
        res.send(trips);
    }
    catch(e){
      res.status(500).send(e.message);
    }
}

export const deleteTrips = async (req, res) => {
    try{
        await tripModel.deleteTrip(pool, req.val.del);
        const result= {};
        result.trips = await tripModel.getAllTrips(pool, req.val.page, req.val.order);
        result.nbPagesTrips = Math.ceil((await tripModel.tripsCount(pool))/10);
        res.send(result);
    }
    catch(e){
      res.status(500).send(e.message);
    }
}





