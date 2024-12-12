import {pool} from "../database/database.js";
import * as subscriptionModel from "../model/subscription.js";

export const getAllSubscriptions = async (req, res) => {//admin
    try{
        const subscription = await subscriptionModel.getAllSubscriptions(pool, req.val);
        if(subscription){
            res.send(subscription)
        }else{
            res.sendStatus(404);
        }
    } catch (e){
        console.error(e)
        res.sendStatus(500);
    }
}


export const getSubscriptionById = async (req, res) => {
    try{
        const subscription = await subscriptionModel.getSubscriptionById(pool, req.session.id);
        if(subscription){
            res.send(subscription)
        }else{
            res.sendStatus(404);
        }
    } catch (e){
        console.error(e)
        res.sendStatus(500);
    }
}


export const addSubscription = async (req, res) => {
    try{
        const id = await subscriptionModel.addSubscription(pool, req.val);
        res.status(201).send(id);
    } catch (e){
        console.error(e)
        res.sendStatus(500);
    }
}

export const updateSubscription = async (req, res) => {
    try{
        await subscriptionModel.updateSubscription(pool, req.val.id, req.val);
        res.sendStatus(204);
    } catch (e){
        console.error(e)
        res.sendStatus(500);
    }
}

export const deleteSubscriptions = async (req, res) => {
    try {
        await subscriptionModel.deleteSubscriptions(pool, req.val);
        res.sendStatus(204);
    } catch (e) {
        console.error(e)
        res.sendStatus(500);
    }
}