import Router from 'express-promise-router';
import {
  getMyInfos,
  getAllPersons,
  updatePerson,
  deletePersons,
  login,
  registration
} from "../controller/person.js";

import {checkJWT} from "../middleware/identification/jwt.js";
import {
    personValidatorMiddleware as PVM,
    personUpdateValidatorMiddleware as PUVM,
    personUpdateValidatorMiddlewareViaAdmin as PUVMVA,
    loginValidatorMiddleware as LVM
    } from "../middleware/validation/person.js";
import {admin} from '../middleware/authorization/mustBeAdmin.js';
import {
    pageValidatorMiddleware as PageVM,
    deleteValidatorMiddleware as DVM,
    searchValidatorMiddleware as SVM
  } from '../middleware/validation/validation.js';

const router = Router();

router.post("/registration", PVM, registration); //OK + gestion du referral code si présent
router.post("/login", LVM, login); //OK

router.get("/infos", checkJWT, getMyInfos); //Récupère toutes les infos du profil
router.get("/porfile", ) //Récupérer les infos de bases concernant l'utilisateur pour le profil + le code de parrainage
router.get("/getAllPersons", checkJWT, admin, PageVM, getAllCarKeys); //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut)
router.get("/getAllPersonsAndPagesCount", ) //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut) + le nombres de pages 
router.get("/getSearchPersons", checkJWT, admin, PageVM, SVM, ) //Champ de recherche sur les ligne

router.patch("/updateMySelf", checkJWT, PUVM, updatePerson); //Modification de son propre compte
router.patch("/update", checkJWT, admin, PUVMVA, updatePerson);
router.patch("/updateBalance", ) //Ajout de crédits à notre balance

router.delete("/delete", checkJWT, DVM, admin, deletePersons);

export default router;

// PLUS TOUCHER !
// CA FONCTIONNE !