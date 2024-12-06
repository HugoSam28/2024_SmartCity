import {pool} from "../database/database";
import * as tripModel from "../model/trip.js";

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

export const addTrip = async (req, res) => {
    try{
        const id = await tripModel.addTrip(pool, req.val);
        res.status(201).send(id);
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

export const deleteTrips = async (req, res) => {
    try {
        await tripModel.deleteTrips(pool, req.val);
        res.sendStatus(204);
    } catch (e) {
        console.error(e)
        res.sendStatus(500);
    }
}

