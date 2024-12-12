import {pool} from "../database/database.js";
import * as vehicleModel from "../model/vehicle.js";

export const getAllVehicles = async (req, res) => {
    try{
        const vehicles = await vehicleModel.getAllVehicles(pool, req.val.page, req.val.order);
        if(vehicles){
            res.sendStatus(200).send(vehicles)
        }else{
            res.sendStatus(404);
        }
    } catch (e){
        console.error(e)
        res.sendStatus(500);
    }
}

export const getAllVehiclesAndPagesCount = async(req, res) => {
      try{
        const result = {};
        result.vehicles = await vehicleModel.getAllVehicles(pool, req.val.page, req.val.order);
        result.nbPagesVehicles = Math.ceil((await vehicleModel.vehiclesCount(pool))/10);
        if(result.vehicles && result.nbPagesVehicles){
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

export const getSearchVehicles = async(req, res) => {
     try{
        const result = {};
        result.vehicles = await vehicleModel.getSearchVehicles(pool, req.val.page, req.val.search, req.val.order);
        result.nbPagesVehicles = Math.ceil((await vehicleModel.vehiclesSearchCount(pool, req.val.search))/10);
        if(result.vehicles && result.nbPagesVehicles){
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

export const getVehiclesAroundMe = async (req, res) => {
  try {
    const vehicles = await vehicleModel.getVehiclesAroundMe(pool, req.val);
    if(vehicles){
        res.sendStatus(200).send(vehicles)
    }else{
        res.sendStatus(404);
    }
  }catch (e){
    console.error(e)
    res.sendStatus(500);
}
}

export const getVehicleById = async (req, res) => {
    try{
        const vehicle = await vehicleModel.getVehicleById(pool, req.val);
        if(vehicle){
            res.sendStatus(200).send(vehicle)
        }else{
            res.sendStatus(404);
        }
    } catch (e){
        console.error(e)
        res.sendStatus(500);
    }
}

export const addVehicle = async (req, res) => {
  try{
    const result= {};
    result.id = await vehicleModel.addVehicle(pool, req.val);
    result.vehicles = await vehicleModel.getAllVehicles(pool, req.val.page, req.val.order);
    result.nbPagesVehicles = Math.ceil((await vehicleModel.vehiclesCount(pool))/10);
    if(result.id && result.vehicles && result.nbPagesVehicles){
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

export const updateInformations = async (req, res) => {
    try{
        await vehicleModel.updateInformations(pool, req.val);
        const vehicles = await vehicleModel.getAllVehicles(pool, req.val.page, req.val.order)
        res.sendStatus(200).send(vehicles);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

export const deleteVehicles = async (req, res) => {
    try{
        const result= {};
        await vehicleModel.deleteVehicles(pool, req.val);
        result.vehicles = await vehicleModel.getAllVehicles(pool, req.val.page, req.val.order);
        result.nbPagesVehicles = Math.ceil((await vehicleModel.vehiclesCount(pool))/10);
        if(result.vehicles && result.nbPagesVehicles){
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

export const updateStatus = async (req, res) => {
    try{
        await vehicleModel.updateStatus(pool, req.session.id);
        res.sendStatus(204);
    } catch (e){
        console.error(e)
        res.sendStatus(500);
    }
}
