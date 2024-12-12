import {pool} from "../../database/database.js";
import * as subscriptionModel from "../../model/v1/subscription.js";



export const getAllSubscriptions = async(req, res) => {
    try{
        const subscriptions = await subscriptionModel.getAllSubscriptions(pool, req.val.page, req.val.order);
        if(subscriptions){
            res.send(subscriptions);
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

export const getAllSubscriptionsAndPagesCount = async(req, res) => {
    try{
        const result = {};
        result.subscriptions = await subscriptionModel.getAllSubscriptions(pool, req.val.page, req.val.order);
        result.nbPagesSubscriptions = Math.ceil((await subscriptionModel.subscriptionsCount(pool))/10);
        if(result.subscriptions && result.nbPagesSubscriptions){
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

export const getSearchSubscriptions = async(req, res) => {
    try{
        const result = {};
        result.subscriptions = await subscriptionModel.getSearchSubscriptions(pool, req.val.page, req.val.search, req.val.order);
        result.nbPagesSubscriptions = Math.ceil((await subscriptionModel.subscriptionsSearchCount(pool, req.val.search))/10);
        if(result.subscriptions && result.nbPagesSubscriptions){
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

export const addSubscription = async(req, res) => {
    try{
        const result= {};
        result.id = await subscriptionModel.addSubscription(pool, req.val);
        result.subscriptions = await subscriptionModel.getAllSubscriptions(pool, req.val.page, req.val.order);
        result.nbPagesSubscriptions = Math.ceil((await subscriptionModel.subscriptionsCount(pool))/10);
        if(result.id && result.subscriptions && result.nbPagesSubscriptions){
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

export const updateSubscription = async (req, res) => {
    try{
        await subscriptionModel.updateSubscription(pool, req.val);
        const subscriptions = await subscriptionModel.getAllSubscriptions(pool, req.val.page, req.val.order)
        res.send(subscriptions);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

export const deleteSubscriptions = async (req, res) => {
    try{
        await subscriptionModel.deleteSubscriptions(pool, req.val);
        const result= {};
        result.subscriptions = await subscriptionModel.getAllSubscriptions(pool, req.val.page, req.val.order);
        result.nbPagesSubscriptions = Math.ceil((await subscriptionModel.subscriptionsCount(pool))/10);
        res.send(result);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}