import Router from "express-promise-router";

import {
    getAllSponsoring,
    getAllSponsoringAndPagesCount,
    getSearchSponsoring,
    addSponsoring,
    updateSponsoring,
    deleteSponsoring
} from "../../controller/v1/sponsoring.js";

import {checkJWT} from "../../middleware/v1/identification/jwt.js";
import {admin} from '../../middleware/v1/authorization/mustBeAdmin.js';
import {
    pageValidatorMiddleware as PageVM,
    searchValidatorMiddleware as SVM,
    deleteValidatorMiddleware as DVM,
    orderValidatorMiddleware as OVM,
} from '../../middleware/v1/validation/validation.js';
import {
  addSponsoringValidatorMiddleware as ASVM,
  updateSponsoringValidatorMiddleware as USVM
} from "../../middleware/v1/validation/sponsoring..js";


const router = Router();

router.get("/getAllSponsoring/:column/:iPage", checkJWT, admin, PageVM, OVM, getAllSponsoring);
router.get("/getAllSponsoringAndPagesCount/:column/:iPage", checkJWT, admin, PageVM, OVM, getAllSponsoringAndPagesCount);
router.get("/getSearchSponsoring/:search/:column/:iPage", checkJWT, admin, PageVM, SVM, OVM, getSearchSponsoring);

router.post("/add", checkJWT, admin, ASVM, PageVM, OVM, addSponsoring);

router.patch("/update", checkJWT, admin, USVM, PageVM, OVM, updateSponsoring);

router.delete("/delete", checkJWT, admin, DVM, PageVM, OVM, deleteSponsoring);

export default router;

/**
 * @swagger
 * /sponsoring/getAllSponsoring/{order}/{iPage}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Sponsoring
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
 *        description: Returns a JSON array of 10 sponsoring, ordered by the column name chosen.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getAllSponsoring'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/mustBeAdmin'
 *      404:
 *        description: No sponsoring.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *      500:
 *        description: Error while connecting to database.
 */

/**
 * @swagger
 * /sponsoring/getAllSponsoringAndPagesCount/{order}/{iPage}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Sponsoring
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
 *        description: "Returns a JSON object:<br>
 *          .sponsoring: a JSON array of 10 sponsoring, ordered by the column name chosen<br>
 *          .nbPagesSponsoring: The number of pages"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getAllSponsoringAndPagesCount'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/mustBeAdmin'
 *      404:
 *        description: No sponsoring.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *      500:
 *        description: Error while connecting to database.
 */

/**
 * @swagger
 * /sponsoring/getSearchSponsoring/{search}/{order}/{iPage}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Sponsoring
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
 *          .sponsoring: a JSON array of 10 sponsoring matching the search value, ordered by the column name chosen <br>
 *          .nbPagesSponsoring: The number of pages"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getAllSponsoringAndPagesCount'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/mustBeAdmin'
 *      404:
 *        description: No sponsoring.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *      500:
 *        description: Internal server error.
 *
 */

/**
 * @swagger
 * /sponsoring/add:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Sponsoring
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/addSponsoring'
 *    responses:
 *      201:
 *        $ref: '#/components/responses/sponsoringAdded'
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
 * /sponsoring/update:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Sponsoring
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/updateSponsoring'
 *    responses:
 *      200:
 *        description: Returns a JSON array of 10 sponsoring, ordered by the column name chosen.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getAllSponsoring'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/mustBeAdmin'
 *      404:
 *        description: No sponsoring.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *      500:
 *        description: Error while connecting to database.
 */

/**
 * @swagger
 * /sponsoring/delete:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Sponsoring
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/deleteSchema'
 *    responses:
 *      200:
 *        description: Returns a JSON array of 10 sponsoring, ordered by the column name chosen.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getAllSponsoring'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/mustBeAdmin'
 *      404:
 *        description: No sponsoring.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *      500:
 *        description: Error while connecting to database.
 */