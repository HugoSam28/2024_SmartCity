import {pool} from "../database/database.js";
import * as carKeyModel from "../model/carKey.js";
import {getAllCarKeys} from "../model/carKey.js";



export const getAllKeys = async(req, res) => {
    try{
        const carKeys = await carKeyModel.getAllCarKeys(pool, req.val.page);
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

export const getAllKeysAndPagesCount = async(req, res) => {
    try{
        const result = {};
        result.keys = await carKeyModel.getAllCarKeys(pool, req.val.page);
        result.nbPagesKeys = Math.ceil((await carKeyModel.getAllCarKeys(pool, req.val.page))/10);
        if(carKeys.keys && result.nbPagesKeys){
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

export const getSearchKeys = async(req, res) => {
    try{
        const result = {};
        result.keys = await carKeyModel.getSearchCarKeys(pool, req.val.page, req.val.search);
        result.nbPagesKeys = Math.ceil((await carKeyModel.pagesCountSearch(pool, req.val.search))/10);
        if(carKeys.keys && result.nbPagesKeys){
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
        result.keys = await carKeyModel.getAllCarKeys(pool, req.val.page);
        result.nbPagesKeys = Math.ceil((await carKeyModel.pagesCount(pool))/10);
        if(result.id && result.keys && result.nbPagesKeys){
            res.status(201).send(id);
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