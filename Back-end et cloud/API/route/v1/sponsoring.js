import Router from "express-promise-router";

import {
    getAllSponsorings,
    getAllSponsoringsAndPagesCount,
    getSearchSponsorings,
    addSponsoring,
    updateSponsoring,
    deleteSponsorings
} from "../../controller/v1/sponsoring.js";

import {checkJWT} from "../../middleware/v1/identification/jwt.js";
import {admin} from '../../middleware/v1/authorization/mustBeAdmin.js';
import {
    pageValidatorMiddleware as PageVM,
    searchValidatorMiddleware as SVM,
    deleteValidatorMiddleware as DVM,
    orderValidatorMiddleware as OVM,
} from '../../middleware/v1/validation/validation.js';
import {sponsoringValidatorMiddleware as SponsorVM} from "../../middleware/v1/validation/sponsoring..js";


const router = Router();

router.get("/getAllSponsorings/:column/:iPage", checkJWT, admin, PageVM, OVM, getAllSponsorings); //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut)
router.get("/getAllSponsoringsAndPagesCount/:column/:iPage", checkJWT, admin, PageVM, OVM, getAllSponsoringsAndPagesCount) //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut) + le nombres de pages
router.get("/getSearchSponsorings/:search/:column/:iPage", checkJWT, admin, PageVM, SVM, OVM, getSearchSponsorings) //Champ de recherche sur les ligne

router.post("/add", checkJWT, admin, SponsorVM, PageVM, OVM, addSponsoring);

router.patch("/update", checkJWT, admin, SponsorVM, PageVM, OVM, updateSponsoring);

router.delete("/delete", checkJWT, admin, DVM, PageVM, OVM, deleteSponsorings);

export default router;