import {pool} from "../database/database.js";
import * as carKeyModel from "../model/carKey.js";

export const getAllCarKeys = async(req, res) => {
    try{
        const carKeys = await carKeyModel.getAllCarKeys(pool, req.val);
        if(carKeys){
            res.send(carKeys);
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

export const addCarKey = async(req, res) => {
    try{
        const id = await carKeyModel.addCarKey(pool, req.val)
        res.status(204).send(id);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

export const updateCarKey = async (req, res) => {
    try{
        await carKeyModel.updateCarKey(pool, req.session.id, req.val);
        res.sendStatus(204);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

export const deleteCarKeys = async (req, res) => {
    try{
        await carKeyModel.deleteCarKeys(pool, req.val);
        res.sendStatus(204);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}