import {pool} from "../../database/database.js";
import * as sponsoringModel from "../../model/v1/sponsoring.js";
/**
 * @swagger
 * components:
 *  schemas:
 *    Sponsoring:
 *      type: object
 *      properties:
 *        referred:
 *          type: integer
 *          description: The referred id
 *        sponsor:
 *          type: integer
 *          description: The sponsor id
 */

/**
 *  @swagger
 *  components:
 *    schemas:
 *      getAllSponsoring:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/Sponsoring'
 */
export const getAllSponsoring = async (req, res) => {
    try{
        const sponsoring = await sponsoringModel.getAllSponsoring(pool, req.val.page, req.val.order);
        if(sponsoring){
            res.send(sponsoring);
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
/**
 *  @swagger
 *  components:
 *    schemas:
 *      getAllSponsoringAndPagesCount:
 *        type: object
 *        properties:
 *          sponsoring:
 *            $ref: '#/components/schemas/getAllSponsoring'
 *          nbPagesSponsoring:
 *            type: integer
 */


export const getAllSponsoringAndPagesCount = async(req, res) => {
    try{
        const result = {};
        result.sponsoring = await sponsoringModel.getAllSponsoring(pool, req.val.page, req.val.order);
        result.nbPagesSponsoring = Math.ceil((await sponsoringModel.sponsoringCount(pool))/10);
        if(result.sponsoring && result.nbPagesSponsoring){
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

export const getSearchSponsoring = async(req, res) => {
    try{
        const result = {};
        result.sponsoring = await sponsoringModel.getSearchSponsoring(pool, req.val.page, req.val.search, req.val.order);
        result.nbPagesSponsoring = Math.ceil((await sponsoringModel.sponsoringSearchCount(pool, req.val.search))/10);
        if(result.sponsoring[0] && result.nbPagesSponsoring){
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

/**
 * @swagger
 * components:
 *  responses:
 *    sponsoringAdded:
 *      description: "Returns a JSON object result:<br>
 *          .id: The id<br>
 *          .sponsoring: a JSON array of 10 sponsoring matching the search value, ordered by the column name chosen <br>
 *          .nbPagesSponsoring: The number of pages"
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              sponsoring:
 *                $ref: '#/components/schemas/getAllSponsoring'
 *              nbPagesSponsoring:
 *                type: integer
 */


export const addSponsoring = async (req, res) => {
    try{
        const result= {};
        result.id = await sponsoringModel.addSponsoring(pool, req.val);
        result.sponsoring = await sponsoringModel.getAllSponsoring(pool, req.val.page, req.val.order);
        result.nbPagesSponsoring = Math.ceil((await sponsoringModel.sponsoringCount(pool))/10);
        if(result.id && result.sponsoring[0] && result.nbPagesSponsoring){
            res.status(201).send(result);
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

export const updateSponsoring = async (req, res) => {
    try{
        await sponsoringModel.updateSponsoring(pool, req.val);
        const sponsoring = await sponsoringModel.getAllSponsoring(pool, req.val.page, req.val.order)
        res.send(sponsoring);
    }
    catch(e){
        res.status(500).send(e.messages);
    }
}

export const deleteSponsoring = async (req, res) => {
    try{
        await sponsoringModel.deleteSponsoring(pool, req.val.del);
        const result= {};
        result.sponsoring = await sponsoringModel.getAllSponsoring(pool, req.val.page, req.val.order);
        if(!result.sponsoring[0]){
            result.sponsoring = await sponsoringModel.getAllSponsoring(pool, {iPage: req.val.page.iPage - 1}, req.val.order);
        }
        result.nbPagesSponsoring = Math.ceil((await sponsoringModel.sponsoringCount(pool))/10);
        if(result.sponsoring[0] && result.nbPagesSponsoring){
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