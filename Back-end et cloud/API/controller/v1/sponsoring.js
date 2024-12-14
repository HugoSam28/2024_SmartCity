import {pool} from "../../database/database.js";
import * as sponsoringModel from "../../model/v1/sponsoring.js";

export const getAllSponsorings = async (req, res) => {
    try{
        const sponsorings = await sponsoringModel.getAllSponsorings(pool, req.val.page, req.val.order);
        if(sponsorings){
            res.send(sponsorings);
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(e){
      res.status(500).send(e.messages);
    }
}

export const getAllSponsoringsAndPagesCount = async(req, res) => {
    try{
        const result = {};
        result.sponsorings = await sponsoringModel.getAllSponsorings(pool, req.val.page, req.val.order);
        result.nbPagesSponsorings = Math.ceil((await sponsoringModel.sponsoringsCount(pool))/10);
        if(result.sponsorings && result.nbPagesSponsorings){
            res.send(result);
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(e){
      res.status(500).send(e.messages);
    }
}

export const getSearchSponsorings = async(req, res) => {
    try{
        const result = {};
        result.sponsorings = await sponsoringModel.getSearchSponsorings(pool, req.val.page, req.val.search, req.val.order);
        result.nbPagesSponsorings = Math.ceil((await sponsoringModel.sponsoringsSearchCount(pool, req.val.search))/10);
        if(result.sponsorings && result.nbPagesSponsorings){
            res.send(result);
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(e){
      res.status(500).send(e.messages);
    }
}

export const addSponsoring = async (req, res) => {
    try{
        const result= {};
        result.id = await sponsoringModel.addSponsoring(pool, req.val);
        result.sponsorings = await sponsoringModel.getAllSponsorings(pool, req.val.page, req.val.order);
        result.nbPagesSponsorings = Math.ceil((await sponsoringModel.sponsoringsCount(pool))/10);
        if(result.id && result.sponsorings && result.nbPagesSponsorings){
            res.send(result);
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(e){
      res.status(500).send(e.messages);
    }
}

export const updateSponsoring = async (req, res) => {
    try{
        await sponsoringModel.updateSponsoring(pool, req.val);
        const sponsorings = await sponsoringModel.getAllSponsorings(pool, req.val.page, req.val.order)
        res.send(sponsorings);
    }
    catch(e){
        cres.status(500).send(e.messages);
    }
}

export const deleteSponsorings = async (req, res) => {
    try{
        await sponsoringModel.deleteSponsoring(pool, req.val);
        const result= {};
        result.sponsorings = await sponsoringModel.getAllSponsorings(pool, req.val.page, req.val.order);
        result.nbPagesSponsorings = Math.ceil((await sponsoringModel.sponsoringsCount(pool))/10);
        res.send(result);
    }
    catch(e){
      res.status(500).send(e.messages);
    }
}