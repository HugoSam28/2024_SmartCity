import Router from 'express-promise-router';

import{
  getAllKeys,
    getAllKeysAndPagesCount,
    getSearchKeys,
    addCarKey,
    updateCarKey,
    deleteCarKeys
} from "../controller/carKey.js"

import {checkJWT} from "../middleware/identification/jwt.js";
import {admin} from '../middleware/authorization/mustBeAdmin.js';
import {
  pageValidatorMiddleware as PageVM,
  searchValidatorMiddleware as SVM
} from '../middleware/validation/validation.js';

const router = Router();

router.get("/getAllKeys", checkJWT, admin, PageVM, getAllKeys); //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut)
router.get("/getAllKeysAndPagesCount", checkJWT, admin, PageVM, getAllKeysAndPagesCount) //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut) + le nombres de pages
router.get("/getSearchKeys", checkJWT, admin, PageVM, SVM, getSearchKeys) //Champ de recherche sur les clés

router.post("/add", checkJWT, admin, addCarKey); //Ajout d'une ligne avec les infos rentrée

router.patch("/update",checkJWT, admin, updateCarKey); //Modification de la ligne choisie

router.delete("/delete", checkJWT, admin, deleteCarKeys); //Delete des lignes choisies

export default router;