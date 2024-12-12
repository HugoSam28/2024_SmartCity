import Router from 'express-promise-router';

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
router.get("/getAllSubscriptions", checkJWT, admin, PageVM, OVM, getAllSubscriptions); //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut)
router.get("/getAllSubscriptionsAndPagesCount", checkJWT, admin, PageVM, OVM, getAllSubscriptionsAndPagesCount) //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut) + le nombres de pages
router.get("/getSearchSubscriptions", checkJWT, admin, PageVM, SVM, OVM, getSearchSubscriptions) //Champ de recherche sur les ligne

router.post("/add", checkJWT, admin, ASVM, PageVM, OVM, addSubscription);

router.patch("/update", checkJWT, admin, USVM, PageVM, OVM, updateSubscription);

router.delete("/delete", checkJWT, admin, DVM, PageVM, OVM, deleteSubscriptions);

export default router;