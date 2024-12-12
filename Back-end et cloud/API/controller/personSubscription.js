import {pool} from "../database/database.js";
import * as personSubscriptionModel from "../model/personSubscription.js";
import * as subscriptionModel from "../model/subscription.js"



export const getAllSubscrigetAllPersonSubscriptionsptions = async(req, res) => {
    try{
        const personSubscriptions = await personSubscriptionModel.getAllPersonSubscriptions(pool, req.val.page, req.val.order);
        if(personSubscriptions){
            res.send(personSubscriptions);
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

export const getAllPersonSubscriptionsAndPagesCount = async(req, res) => {
    try{
        const result = {};
        result.personSubscriptions = await personSubscriptionModel.getAllPersonSubscriptions(pool, req.val.page, req.val.order);
        result.nbPagesPersonSubscriptions = Math.ceil((await personSubscriptionModel.personSubscriptionsCount(pool))/10);
        if(result.personSubscriptions && result.nbPagesPersonSubscriptions){
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

export const getSearchPersonSubscriptions = async(req, res) => {
    try{
        const result = {};
        result.personSubscriptions = await personSubscriptionModel.getSearchPersonSubscriptions(pool, req.val.page, req.val.search, req.val.order);
        result.nbPagesPersonSubscriptions = Math.ceil((await personSubscriptionModel.personSubscriptionsSearchCount(pool, req.val.search))/10);
        if(result.personSubscriptions && result.nbPagesPersonSubscriptions){
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

export const getOwnSubscription = async(req, res) => {
    try{
        result = {};
        result.own = await personSubscriptionModel.getOwnSubscription(pool, req.val);
        result.others = await subscriptionModel.getOthersSubscription(pool, result.own);
        result.own = await subscriptionModel.getOwnSubscription(pool, result.own);
        if(result.own && result.others){
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

export const addOwnSubscription = async(req, res) => {
    try{
        await personSubscriptionModel.addOwnSubscription(pool, req.val);
    }catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

export const addPersonSubscription = async(req, res) => {
    try{
        const result= {};
        result.id = await personSubscriptionModel.addPersonSubscription(pool, req.val);
        result.personSubscriptions = await personSubscriptionModel.getSearchPersonSubscriptions(pool, req.val.page, req.val.search, req.val.order);
        result.nbPagesPersonSubscriptions = Math.ceil((await personSubscriptionModel.personSubscriptionsSearchCount(pool, req.val.search))/10);
        if(result.id && result.personSubscriptions && result.nbPagesPersonSubscriptions){
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

export const updatePersonSubscription = async (req, res) => {
    try{
        await personSubscriptionModel.updatePersonSubscription(pool, req.val);
        const personSubscriptions = await personSubscriptionModel.getAllPersonSubscriptions(pool, req.val.page, req.val.order)
        res.send(personSubscriptions);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

export const deletePersonSubscription = async (req, res) => {
    try{
        await subscriptionModel.deleteSubscriptions(pool, req.val);
        const result= {};
        result.personSubscriptions = await personSubscriptionModel.getSearchPersonSubscriptions(pool, req.val.page, req.val.search, req.val.order);
        result.nbPagesPersonSubscriptions = Math.ceil((await personSubscriptionModel.personSubscriptionsSearchCount(pool, req.val.search))/10);
        res.send(result);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}