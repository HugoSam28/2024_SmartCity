import Router from 'express-promise-router';
import {
  registration,
  login,
  addPerson,
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

router.post("/registration", PVM, registration);
router.post("/login", LVM, login);
router.post("/add", checkJWT, admin, PVM, PageVM, OVM, addPerson);

router.get("/infos", checkJWT, getMyInfos);
router.get("/porfile",checkJWT, getProfileInfos);-
router.get("/getAllPersons/:column/:iPage", checkJWT, admin, PageVM, OVM, getAllPersons);-
router.get("/getAllPersonsAndPagesCount/:column/:iPage",checkJWT, admin, PageVM, OVM, getAllPersonsAndPagesCount);
router.get("/getSearchPersons/:search/:column/:iPage", checkJWT, admin, PageVM, SVM, OVM, getSearchPersons);

router.patch("/updateMySelf", checkJWT, PUVM, PageVM, OVM, updateMySelf);
router.patch("/update", checkJWT, admin, PUVMVA, PageVM, OVM, updatePerson);
router.patch("/updateBalance",checkJWT, PUVM, updatePersonalBalance);

router.delete("/delete", checkJWT, admin, DVM, PageVM, OVM, deletePersons);

export default router;