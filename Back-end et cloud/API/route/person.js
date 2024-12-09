import Router from 'express-promise-router';
import {
    getPersonById,
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
    loginValidatorMiddleware as LVM
    } from "../middleware/validation/person.js";
import {admin} from '../middleware/authorization/mustBeAdmin.js';
import {pageValidator} from '../middleware/validation/validation.js';

const router = Router();

router.post("/registration", PVM, registration);
router.post("/login", LVM, login);

router.get("/info", checkJWT, getPersonById);
router.get("/getPersons", checkJWT, admin, pageValidator, getAllPersons);

router.patch("/update", checkJWT, PUVM, updatePerson);

router.delete("/delete", checkJWT, PUVM, admin, deletePersons);

export default router;