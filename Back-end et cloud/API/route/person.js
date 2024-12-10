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
    deleteValidatorMiddleware as DVM,
    loginValidatorMiddleware as LVM
    } from "../middleware/validation/person.js";
import {admin} from '../middleware/authorization/mustBeAdmin.js';
import {pageValidator} from '../middleware/validation/validation.js';

const router = Router();

router.post("/registration", PVM, registration);
router.post("/login", LVM, login);

router.get("/infos", checkJWT, getMyInfos);
router.get("/getPersons", checkJWT, admin, pageValidator, getAllPersons);

router.patch("/updateMySelf", checkJWT, PUVM, updatePerson);
router.patch("/update", checkJWT, admin, PUVMVA, updatePerson);

router.delete("/delete", checkJWT, DVM, admin, deletePersons);

export default router;