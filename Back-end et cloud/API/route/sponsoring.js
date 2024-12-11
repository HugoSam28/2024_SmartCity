import Router from "express-promise-router";

import {
    getAllSponsorings,
    addSponsoring,
    updateSponsoring,
    deleteSponsorings
} from "../controller/sponsoring.js";

import {checkJWT} from "../middleware/identification/jwt.js";
import {admin} from '../middleware/authorization/mustBeAdmin.js';
import {
    pageValidatorMiddleware as PageVM,
    searchValidatorMiddleware as SVM,
} from '../middleware/validation/validation.js';


const router = Router();

router.get("/getAllSponsorings", checkJWT, admin, PageVM, getAllSponsorings); //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut)
router.get("/getAllSponsoringsAndPagesCount", checkJWT, admin, ) //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut) + le nombres de pages
router.get("/getSearchSponsorings", checkJWT, admin, PageVM, SVM, ) //Champ de recherche sur les ligne

router.use("/add", checkJWT, addSponsoring);

router.use("/update", checkJWT, admin, updateSponsoring);

router.use("/delete", checkJWT, admin, deleteSponsorings);

export default router;