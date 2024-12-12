import {pool} from "../database/database.js";
import * as carKeyModel from "../model/carKey.js";



export const getAllCarKeys = async(req, res) => {
    try{
        const carKeys = await carKeyModel.getAllCarKeys(pool, req.val.page, req.val.order);
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

export const getAllCarKeysAndPagesCount = async(req, res) => {
    try{
        const result = {};
        result.keys = await carKeyModel.getAllCarKeys(pool, req.val.page, req.val.order);
        result.nbPagesKeys = Math.ceil((await carKeyModel.keysCount(pool))/10);
        if(result.keys && result.nbPagesKeys){
            res.send(result);
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

export const getSearchCarKeys = async(req, res) => {
    try{
        const result = {};
        result.keys = await carKeyModel.getSearchCarKeys(pool, req.val.page, req.val.search, req.val.order);
        result.nbPagesKeys = Math.ceil((await carKeyModel.keysSearchCount(pool, req.val.search))/10);
        if(result.keys && result.nbPagesKeys){
            res.send(result);
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
        const result= {};
        result.id = await carKeyModel.addCarKey(pool, req.val);
        result.keys = await carKeyModel.getAllCarKeys(pool, req.val.page, req.val.order);
        result.nbPagesKeys = Math.ceil((await carKeyModel.keysCount(pool))/10);
        if(result.id && result.keys && result.nbPagesKeys){
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

export const updateCarKey = async (req, res) => {
    try{
        await carKeyModel.updateCarKey(pool, req.val);
        const carKeys = await carKeyModel.getAllCarKeys(pool, req.val.page, req.val.order)
        res.send(carKeys);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

export const deleteCarKeys = async (req, res) => {
    try{
        await carKeyModel.deleteCarKeys(pool, req.val);
        const result= {};
        result.keys = await carKeyModel.getAllCarKeys(pool, req.val.page, req.val.order);
        result.nbPagesKeys = Math.ceil((await carKeyModel.keysCount(pool))/10);
        res.send(result);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}