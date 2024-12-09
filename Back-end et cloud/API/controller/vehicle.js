import {pool} from "../database/database.js";
import * as vehicleModel from "../model/vehicle.js";

export const getAllVehicles = async (req, res) => {
    try{
        const vehicles = await vehicleModel.getAllVehicles(pool, req.val);
        if(vehicles){
            res.send(vehicles)
        }else{
            res.sendStatus(404);
        }
    } catch (e){
        console.error(e)
        res.sendStatus(500);
    }
}

export const getVehiclesAroundMe = async (req, res) => {
  try {
    const vehicles = await vehicleModel.getVehiclesAroundMe(pool, req.val);
    if(vehicles){
        res.send(vehicles)
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
        const {rows} = await vehicleModel.getVehicleById(pool, req.session.id);
        if(rows){
            res.send(rows[0])
        }else{
            res.sendStatus(404);
        }
    } catch (e){
        console.error(e)
        res.sendStatus(500);
    }
}

export const addVehicle = async (req, res) => {
    try {
        const id = await vehicleModel.addVehicle(pool, req.val);
        res.status(201).send(id);
    } catch (e) {
        console.error(e)
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

export const updateInformations = async (req, res) => {
    try{
        await vehicleModel.updateInformations(pool, req.session.id, req.val);
        res.sendStatus(204);
    } catch (e){
        console.error(e)
        res.sendStatus(500);
    }
}

export const deleteVehicles = async (req, res) => {
    try {
        await vehicleModel.deleteProduct(pool, req.val);
        res.sendStatus(204);
    } catch (e) {
        console.error(e)
        res.sendStatus(500);
    }
}

