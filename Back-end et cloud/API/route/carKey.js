import Router from 'express-promise-router';

import{
    getAllCarKeys,
    addCarKey,
    updateCarKey,
    deleteCarKeys
} from "../controller/carKey.js"

import {checkJWT} from "../middleware/identification/jwt.js";
import {admin} from '../middleware/authorization/mustBeAdmin.js';
import {pageValidator} from '../middleware/validation/validation.js';

const router = Router();

router.get("/getAllKeys", checkJWT, admin, pageValidator, getAllCarKeys);

router.post("/add", checkJWT, admin, addCarKey);

router.patch("/update",checkJWT, admin, updateCarKey);

router.delete("/delete", checkJWT, admin, deleteCarKeys);

export default router;