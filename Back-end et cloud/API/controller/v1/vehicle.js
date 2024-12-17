import {pool} from "../../database/database.js";
import * as vehicleModel from "../../model/v1/vehicle.js";

export const getAllVehicles = async (req, res) => {
  try{
        const vehicles = await vehicleModel.getAllVehicles(pool, req.val.page, req.val.order);
        if(vehicles[0]){
            res.send(vehicles)
        }else{
            res.sendStatus(404);
        }
    } catch (e){
      res.status(500).send(e.message);
    }
}

export const getAllVehiclesAndPagesCount = async(req, res) => {
      try{
        const result = {};
        result.vehicles = await vehicleModel.getAllVehicles(pool, req.val.page, req.val.order);
        result.nbPagesVehicles = Math.ceil((await vehicleModel.vehiclesCount(pool))/10);
        if(result.vehicles[0] && result.nbPagesVehicles){
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

export const getSearchVehicles = async(req, res) => {
     try{
        const result = {};
        result.vehicles = await vehicleModel.getSearchVehicles(pool, req.val.page, req.val.search, req.val.order);
        result.nbPagesVehicles = Math.ceil((await vehicleModel.vehiclesSearchCount(pool, req.val.search))/10);
        if(result.vehicles[0] && result.nbPagesVehicles){
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

export const getVehiclesAroundMe = async (req, res) => {
  try {
    const vehicles = await vehicleModel.getVehiclesAroundMe(pool, req.val);
    if(vehicles[0]){
        res.send(vehicles)
    }else{
        res.sendStatus(404);
    }
  }catch (e){
    res.status(500).send(e.message);
}
}

export const getVehicleById = async (req, res) => {
    try{
        const vehicle = await vehicleModel.getVehicleById(pool, req.val);
        if(vehicle[0]){
            res.send(vehicle)
        }else{
            res.sendStatus(404);
        }
    } catch (e){
      res.status(500).send(e.message);
    }
}

export const addVehicle = async (req, res) => {
  try{
    const result= {};
    result.id = await vehicleModel.addVehicle(pool, req.val);
    result.vehicles = await vehicleModel.getAllVehicles(pool, req.val.page, req.val.order);
    result.nbPagesVehicles = Math.ceil((await vehicleModel.vehiclesCount(pool))/10);
    res.status(201).send(result);
  }
  catch(e){
    res.status(500).send(e.message);
  }
}

export const updateInformations = async (req, res) => {
    try{
        await vehicleModel.updateInformations(pool, req.val);
        const vehicles = await vehicleModel.getAllVehicles(pool, req.val.page, req.val.order)
        res.send(vehicles);
    }
    catch(e){
      res.status(500).send(e.message);
    }
}

export const deleteVehicles = async (req, res) => {
    try{
        const result= {};
        await vehicleModel.deleteVehicles(pool, req.val.del);
        result.vehicles = await vehicleModel.getAllVehicles(pool, req.val.page, req.val.order);
        result.nbPagesVehicles = Math.ceil((await vehicleModel.vehiclesCount(pool))/10);
        if(result.vehicles[0] && result.nbPagesVehicles){
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

export const updateStatus = async (req, res) => {
    try{
        await vehicleModel.updateStatus(pool, req.session.id);
        res.sendStatus(204);
    } catch (e){
      res.status(500).send(e.message);
    }
}
