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
} from "../../controller/person.js";

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
    searchValidatorMiddleware as SVM
  } from '../../middleware/v1/validation/validation.js';

const router = Router();

router.post("/registration", PVM, registration); //OK + gestion du referral code si présent
router.post("/login", LVM, login); //OK

router.get("/infos", checkJWT, getMyInfos); //Récupère toutes les infos du profil
router.get("/porfile", getProfileInfos) //Récupérer les infos de bases concernant l'utilisateur pour le profil + le code de parrainage
router.get("/getAllPersons", checkJWT, admin, PageVM, getAllPersons); //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut)
router.get("/getAllPersonsAndPagesCount", getAllPersonsAndPagesCount) //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut) + le nombres de pages 
router.get("/getSearchPersons", checkJWT, admin, PageVM, SVM, getSearchPersons) //Champ de recherche sur les ligne

router.patch("/updateMySelf", checkJWT, PUVM, updateMySelf); //Modification de son propre compte
router.patch("/update", checkJWT, admin, PUVMVA, updatePerson);
router.patch("/updateBalance", updatePersonalBalance) //Ajout de crédits à notre balance

router.delete("/delete", checkJWT, admin, DVM, PageVM, deletePersons);

export default router;