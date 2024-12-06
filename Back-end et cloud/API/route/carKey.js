import Router from 'express-promise-router';

import{
    getCarKeys,
    addCarKey,
    updateCarKey,
    deleteCarKeys
} from "../controller/carKey.js"

import {checkJWT} from "../middleware/identification/jwt.js";
import {admin} from '../middleware/authorization/mustBeAdmin.js';

const router = Router();

router.get("/getAllKeys", checkJWT, admin, getCarKeys);

router.post("/add", checkJWT, admin, addCarKey);

router.patch("/update",checkJWT, admin, updateCarKey);

router.delete("/delete", checkJWT, admin, deleteCarKeys);

export default router;