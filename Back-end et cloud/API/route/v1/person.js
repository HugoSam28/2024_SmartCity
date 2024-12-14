import Router from 'express-promise-router';
import {
  registration,
  login,
  getMyInfos,
  getProfileInfos,
  getAllPersons,
  getAllPersonsAndPagesCount,
  getSearchPersons,
  updateMySelf,
  updatePerson,
  updatePersonalBalance,
  deletePersons
} from "../../controller/v1/person.js";

import {checkJWT} from "../../middleware/v1/identification/jwt.js";
import {
    personValidatorMiddleware as PVM,
    personUpdateValidatorMiddleware as PUVM,
    personUpdateValidatorMiddlewareViaAdmin as PUVMVA,
    loginValidatorMiddleware as LVM
    } from "../../middleware/v1/validation/person.js";
import {admin} from '../../middleware/v1/authorization/mustBeAdmin.js';
import {
    pageValidatorMiddleware as PageVM,
    deleteValidatorMiddleware as DVM,
    searchValidatorMiddleware as SVM,
    orderValidatorMiddleware as OVM
  } from '../../middleware/v1/validation/validation.js';

const router = Router();

router.post("/registration", PVM, registration); //OK + gestion du referral code si présent
router.post("/login", LVM, login); //OK

router.get("/infos", checkJWT, getMyInfos); //Récupère toutes les infos du profil
router.get("/porfile",checkJWT, getProfileInfos) //Récupérer les infos de bases concernant l'utilisateur pour le profil + le code de parrainage
router.get("/getAllPersons/:order/:iPage", checkJWT, admin, PageVM, OVM, getAllPersons); //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut)
router.get("/getAllPersonsAndPagesCount/:order/:iPage",checkJWT, admin, PageVM, OVM, getAllPersonsAndPagesCount) //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut) + le nombres de pages
router.get("/getSearchPersons/:search/:order/:iPage", checkJWT, admin, PageVM, SVM, OVM, getSearchPersons) //Champ de recherche sur les ligne

router.patch("/updateMySelf", checkJWT, PUVM, PageVM, OVM, updateMySelf); //Modification de son propre compte
router.patch("/update", checkJWT, admin, PUVMVA, PageVM, OVM, updatePerson);
router.patch("/updateBalance",checkJWT, PUVM, updatePersonalBalance) //Ajout de crédits à notre balance

router.delete("/delete", checkJWT, admin, DVM, PageVM, OVM, deletePersons);

export default router;