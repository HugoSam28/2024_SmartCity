import Router from 'express-promise-router';

import {
    getAllSubscriptions,
    getSubscriptionById,
    addSubscription,
    updateSubscription,
    deleteSubscriptions

} from "../../controller/subscription.js";

import {checkJWT} from "../../middleware/v1/identification/jwt.js";
import {admin} from '../../middleware/v1/authorization/mustBeAdmin.js';
import {
    pageValidatorMiddleware as PageVM,
    searchValidatorMiddleware as SVM,
    deleteValidatorMiddleware as DVM,
    orderValidatorMiddleware as OVM
} from "../../middleware/v1/validation/validation.js";

const router = Router();
router.get("/getAllSubscriptions", checkJWT, admin, PageVM, OVM, getAllSubscriptions); //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut)
router.get("/getAllSubscriptionsAndPagesCount", checkJWT, admin, PageVM, OVM, ) //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut) + le nombres de pages
router.get("/getSearchSubscriptions", checkJWT, admin, PageVM, SVM, OVM, ) //Champ de recherche sur les ligne

router.get("/getMySubscriptions", ) //Récupération tous les abonnements en distinguant les notres des autres

router.post("/add", checkJWT, admin, addSubscription);

router.patch("/update", checkJWT, admin, updateSubscription);
router.patch("/updateOwnSubscriptions", ) //Modification de nos abonnements

router.delete("/delete", checkJWT, admin, DVM, PageVM, deleteSubscriptions);

export default router;