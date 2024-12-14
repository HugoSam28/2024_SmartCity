import {pool} from "../../database/database.js";
import * as subscriptionModel from "../../model/v1/subscription.js";

/**
 * @swagger
 * components:
 *  schemas:
 *    Subscription:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        label:
 *          type: string
 *        price:
 *          type: number
 *        discount:
 *          type: number
 *          minimum: 0
 *          maximum: 1
 *        paymentRecurrence:
 *          type: string
 *        vehicleType:
 *          type: string
 */

/**
 *  @swagger
 *  components:
 *    schemas:
 *      getAllSubscriptions:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/Subscription'
 */


export const getAllSubscriptions = async(req, res) => {
    try{
        const subscriptions = await subscriptionModel.getAllSubscriptions(pool, req.val.page, req.val.order);
        if(subscriptions[0]){
            res.send(subscriptions);
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(e){
      res.status(500).send(e.message);
    }
}
/**
 *  @swagger
 *  components:
 *    schemas:
 *      getAllSubscriptionsAndPagesCount:
 *        type: object
 *        properties:
 *          subscriptions:
 *            $ref: '#/components/schemas/getAllSubscriptions'
 *          nbPagesSubscriptions:
 *            type: integer
 */

export const getAllSubscriptionsAndPagesCount = async(req, res) => {
    try{
        const result = {};
        result.subscriptions = await subscriptionModel.getAllSubscriptions(pool, req.val.page, req.val.order);
        result.nbPagesSubscriptions = Math.ceil((await subscriptionModel.subscriptionsCount(pool))/10);
        if(result.subscriptions[0] && result.nbPagesSubscriptions){
            res.send(result);
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(e){
      res.status(500).send(e.message);
    }
}

export const getSearchSubscriptions = async(req, res) => {
    try{
        const result = {};
        result.subscriptions = await subscriptionModel.getSearchSubscriptions(pool, req.val.page, req.val.search, req.val.order);
        result.nbPagesSubscriptions = Math.ceil((await subscriptionModel.subscriptionsSearchCount(pool, req.val.search))/10);
        if(result.subscriptions[0] && result.nbPagesSubscriptions){
            res.send(result);
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(e){
      res.status(500).send(e.message);
    }
}

/**
 * @swagger
 * components:
 *  responses:
 *    subscriptionAdded:
 *      description: "Returns a JSON object result:<br>
 *          .id: The id
 *          .subscriptions: a JSON array of 10 subscriptions matching the search value, ordered by the column name chosen <br>
 *          .nbPagesSubscriptions: The number of pages"
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              subscriptions:
 *                $ref: '#/components/schemas/getAllSubscriptions'
 *              nbPagesSubscriptions:
 *                type: integer
 */

export const addSubscription = async(req, res) => {
    try{
        const result= {};
        result.id = await subscriptionModel.addSubscription(pool, req.val);
        result.subscriptions = await subscriptionModel.getAllSubscriptions(pool, req.val.page, req.val.order);
        result.nbPagesSubscriptions = Math.ceil((await subscriptionModel.subscriptionsCount(pool))/10);
        if(result.id && result.subscriptions && result.nbPagesSubscriptions){
            res.send(result);
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(e){
      res.status(500).send(e.message);
    }
}

export const updateSubscription = async (req, res) => {
    try{
        await subscriptionModel.updateSubscription(pool, req.val);
        const subscriptions = await subscriptionModel.getAllSubscriptions(pool, req.val.page, req.val.order)
        res.send(subscriptions);
    }
    catch(e){
      res.status(500).send(e.message);
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
      res.status(500).send(e.message);
    }
}