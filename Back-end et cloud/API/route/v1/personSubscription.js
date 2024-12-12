import Router from 'express-promise-router';

import {
    getAllPersonSubscriptions,
    getAllPersonSubscriptionsAndPagesCount,
    getSearchPersonSubscriptions,
    getOwnSubscription,
    addOwnSubscription,
    addPersonSubscription,
    updatePersonSubscription,
    deletePersonSubscription
} from "../../controller/personSubscription.js";

import {checkJWT} from "../../middleware/v1/identification/jwt.js";
import {admin} from '../../middleware/v1/authorization/mustBeAdmin.js';
import {
    pageValidatorMiddleware as PageVM,
    searchValidatorMiddleware as SVM,
    deleteValidatorMiddleware as DVM,
    orderValidatorMiddleware as OVM
} from "../../middleware/v1/validation/validation.js";

const router = Router();
router.get("/getAllPersonSubscriptions", checkJWT, admin, PageVM, OVM, getAllPersonSubscriptions); //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut)
router.get("/getAllPersonSubscriptionsAndPagesCount", checkJWT, admin, PageVM, OVM, getAllPersonSubscriptionsAndPagesCount) //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut) + le nombres de pages
router.get("/getSearchPersonSubscriptions", checkJWT, admin, PageVM, SVM, OVM, getSearchPersonSubscriptions) //Champ de recherche sur les ligne

router.get("/getOwnSubscription", checkJWT, admin, PageVM, SVM, OVM, getOwnSubscription) //Différencier nos abonnements de ceux qu'on a pas 
router.add("/addOwnSubscription", checkJWT, admin, PageVM, SVM, OVM, addOwnSubscription) //Nous ajouter un abonnements

router.post("/add", checkJWT, admin, addPersonSubscription);
router.patch("/update", checkJWT, admin, updatePersonSubscription);
router.delete("/delete", checkJWT, admin, DVM, PageVM, deletePersonSubscription);

export default router;