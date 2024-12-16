import  Router from 'express-promise-router';

import {
    getAllSubscriptions,
    getAllSubscriptionsAndPagesCount,
    getSearchSubscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscriptions

} from "../../controller/v1/subscription.js";

import {checkJWT} from "../../middleware/v1/identification/jwt.js";
import {admin} from '../../middleware/v1/authorization/mustBeAdmin.js';
import {
    pageValidatorMiddleware as PageVM,
    searchValidatorMiddleware as SVM,
    deleteValidatorMiddleware as DVM,
    orderValidatorMiddleware as OVM
} from "../../middleware/v1/validation/validation.js";

import {
    addSubscriptionValidatorMiddleware as ASVM,
    updateSubscriptionValidatorMiddleware as USVM
} from "../../middleware/v1/validation/subscription.js"

const router = Router();
router.get("/getAllSubscriptions/:column/:iPage", checkJWT, admin, PageVM, OVM, getAllSubscriptions); //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut)
router.get("/getAllSubscriptionsAndPagesCount/:column/:iPage", checkJWT, admin, PageVM, OVM, getAllSubscriptionsAndPagesCount) //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut) + le nombres de pages
router.get("/getSearchSubscriptions/:search/:column/:iPage", checkJWT, admin, PageVM, SVM, OVM, getSearchSubscriptions) //Champ de recherche sur les ligne

router.post("/add", checkJWT, admin, ASVM, PageVM, OVM, addSubscription);

router.patch("/update", checkJWT, admin, USVM, PageVM, OVM, updateSubscription);

router.delete("/delete", checkJWT, admin, DVM, PageVM, OVM, deleteSubscriptions);

export default router;


/**
 * @swagger
 * /subscription/getAllSubscriptions/{order}/{iPage}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Subscription
 *    parameters:
 *      - in: path
 *        name: order
 *        schema:
 *          type: string
 *        required: true
 *        description: The name of the column by which the array should be sorted
 *      - in: path
 *        name: iPage
 *        schema:
 *          type: integer
 *        required: true
 *        description: The page number
 *    responses:
 *      200:
 *        description: Returns a JSON array of 10 subscriptions, ordered by the column name chosen.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getAllSubscriptions'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/mustBeAdmin'
 *      404:
 *        description: No subscription.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *      500:
 *        description: Error while connecting to database.
 */

/**
 * @swagger
 * /subscription/getAllSubscriptionsAndPagesCount/{order}/{iPage}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Subscription
 *    parameters:
 *      - in: path
 *        name: order
 *        schema:
 *          type: string
 *        required: true
 *        description: The name of the column by which the array should be sorted
 *      - in: path
 *        name: iPage
 *        schema:
 *          type: integer
 *        required: true
 *        description: The page number
 *    responses:
 *      200:
 *        description: "Returns a JSON object result:<br>
 *          .subscriptions: a JSON array of 10 subscriptions, ordered by the column name chosen <br>
 *          .nbPagesSubscriptions: The number of pages"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getAllSubscriptionsAndPagesCount'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/mustBeAdmin'
 *      404:
 *        description: No subscription.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *      500:
 *        description: Error while connecting to database.
 */

/**
 * @swagger
 * /subscription/getSearchSubscriptions/{search}/{order}/{iPage}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Subscription
 *    parameters:
 *      - in: path
 *        name: search
 *        schema:
 *          type: string
 *        required: true
 *        description: The value of the research
 *      - in: path
 *        name: order
 *        schema:
 *          type: string
 *        required: true
 *        description: The name of the column by which the array should be sorted
 *      - in: path
 *        name: iPage
 *        schema:
 *          type: integer
 *        required: true
 *        description: The page number
 *    responses:
 *      200:
 *        description: "Returns a JSON object result:<br>
 *          .subscriptions: a JSON array of 10 subscriptions matching the search value, ordered by the column name chosen <br>
 *          .nbPagesSubscriptions: The number of pages"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getAllSubscriptionsAndPagesCount'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/mustBeAdmin'
 *      404:
 *        description: No subscription.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *      500:
 *        description: internal server error.
 *
 */

/**
 * @swagger
 * /subscription/add:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Subscription
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/addSubscription'
 *    responses:
 *      201:
 *        $ref: '#/components/responses/subscriptionAdded'
 *      400:
 *        description: the error(s) described
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/mustBeAdmin'
 *      500:
 *        description: internal server error.
 */

/**
 * @swagger
 * /subscription/update:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Subscription
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/updateSubscription'
 *    responses:
 *      200:
 *        description: Returns a JSON array of 10 subscriptions, ordered by the column name chosen.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getAllSubscriptions'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/mustBeAdmin'
 *      404:
 *        description: No subscription.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *      500:
 *        description: Error while connecting to database.
 */

/**
 * @swagger
 * /subscription/delete:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Subscription
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/deleteSchema'
 *    responses:
 *      200:
 *        description: Returns a JSON array of 10 subscriptions, ordered by the column name chosen.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getAllSubscriptions'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/mustBeAdmin'
 *      404:
 *        description: No subscription.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *      500:
 *        description: Error while connecting to database.
 */