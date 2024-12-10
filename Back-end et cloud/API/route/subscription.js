import Router from 'express-promise-router';

import {
    getAllSubscriptions,
    getSubscriptionById,
    addSubscription,
    updateSubscription,
    deleteSubscriptions

} from "../controller/subscription.js";

import {checkJWT} from "../middleware/identification/jwt.js";
import {admin} from '../middleware/authorization/mustBeAdmin.js';
import {
    pageValidatorMiddleware as PageVM,
    searchValidatorMiddleware as SVM,
} from "../middleware/validation/validation.js";

const router = Router();
router.get("/getAllSubscriptions", checkJWT, admin, PageVM, getAllCarKeys); //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut)
router.get("/getAllSubscriptionsAndPagesCount", checkJWT, admin, PageVM, ) //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut) + le nombres de pages
router.get("/getSearchSubscriptions", checkJWT, admin, PageVM, SVM, ) //Champ de recherche sur les ligne

router.get("/getMySubscriptions", ) //Récupération tous les abonnements en distinguant les notres des autres

router.post("/add", checkJWT, admin, addSubscription);

router.patch("/update", checkJWT, admin, updateSubscription);
router.patch("/updateOwnSubscriptions", ) //Modification de nos abonnements

router.delete("/delete", checkJWT, admin, deleteSubscriptions);

export default router;