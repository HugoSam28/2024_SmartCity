import {pool} from "../../database/database.js";
import * as carKeyModel from "../../model/v1/carKey.js";



export const getAllCarKeys = async(req, res) => {
    try{
        const carKeys = await carKeyModel.getAllCarKeys(pool, req.val.page, req.val.order);
        if(carKeys[0]){
            res.send(carKeys);
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(e){
      console.error(e);
      res.status(500).send(e.messages);
    }
}

export const getAllCarKeysAndPagesCount = async(req, res) => {
    try{
        const result = {};
        result.keys = await carKeyModel.getAllCarKeys(pool, req.val.page, req.val.order);
        result.nbPagesKeys = Math.ceil((await carKeyModel.keysCount(pool))/10);
        if(result.keys[0] && result.nbPagesKeys){
            res.send(result);
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(e){
      console.error(e);
      res.status(500).send(e.messages);
    }
}

export const getSearchCarKeys = async(req, res) => {
    try{
        const result = {};
        result.keys = await carKeyModel.getSearchCarKeys(pool, req.val.page, req.val.search, req.val.order);
        result.nbPagesKeys = Math.ceil((await carKeyModel.keysSearchCount(pool, req.val.search))/10);
        if(result.keys[0] && result.nbPagesKeys){
            res.send(result);
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(e){
        console.error(e);
        res.status(500).send(e.messages);
    }
}

export const addCarKey = async(req, res) => {
    try{
        const result= {};
        result.id = await carKeyModel.addCarKey(pool, req.val);
        result.keys = await carKeyModel.getAllCarKeys(pool, req.val.page, req.val.order);
        result.nbPagesKeys = Math.ceil((await carKeyModel.keysCount(pool))/10);
        res.status(201).send(result);
    }
    catch(e){
      console.error(e);
      res.status(500).send(e.messages);
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
      res.status(500).send(e.messages);
    }
}

export const deleteCarKeys = async (req, res) => {
    try{
        await carKeyModel.deleteCarKeys(pool, req.val.del);
        const result= {};
        result.keys = await carKeyModel.getAllCarKeys(pool, req.val.page, req.val.order);
        if(!result.keys[0]){
          result.keys = await carKeyModel.getAllCarKeys(pool, {iPage: req.val.page.iPage - 1}, req.val.order);
        }
        result.nbPagesKeys = Math.ceil((await carKeyModel.keysCount(pool))/10);
        if(result.keys[0] && result.nbPagesKeys){
          res.send(result);
        }
        else {
          res.sendStatus(404);
        }
    }
    catch(e){
        console.error(e);
        res.status(500).send(e.messages);
    }
}