import {pool} from "../database/database";
import * as sponsoringModel from "../model/sponsoring.js";

export const getAllSponsorings = async (req, res) => {//admin
    try{
        const sponsoring = await sponsoringModel.getAllSponsoring(pool, req.val);
        if(sponsoring){
            res.send(sponsoring)
        }else{
            res.sendStatus(404);
        }
    } catch (e){
        console.error(e)
        res.sendStatus(500);
    }
}


export const addSponsoring = async (req, res) => {
    try{
        const id = await sponsoringModel.addSponsoring(pool, req.val);
        res.status(201).send(id);
    } catch (e){
        console.error(e)
        res.sendStatus(500);
    }
}

export const updateSponsoring = async (req, res) => {
    try{
        await sponsoringModel.updateSponsoring(pool, req.session.id, req.val);
        res.sendStatus(204);
    } catch (e){
        console.error(e)
        res.sendStatus(500);
    }
}

export const deleteSponsoring = async (req, res) => {
    try {
        await sponsoringModel.deleteSponsoring(pool, req.val);
        res.sendStatus(204);
    } catch (e) {
        console.error(e)
        res.sendStatus(500);
    }
}