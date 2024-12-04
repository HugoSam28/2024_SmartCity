import Router from 'express-promise-router';

import{
    getCarKey,
    addCarKey,
    updateCarKey,
    deleteCarKey
} from "../controler/carKey.js"

import {checkJWT} from "../middleware/identification/jwt.js";
import {admin} from '../middleware/authorization/mustBeAdmin.js';

const router = Router();

router.get("/info", checkJWT, admin, getCarKey);
router.post("/add", checkJWT, admin, addCarKey);
router.patch("/update",checkJWT, admin, updateCarKey);
router.delete("/delete", checkJWT, admin, deleteCarKey);

export default router;