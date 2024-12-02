import Router from 'express-promise-router';

import{
    getCarKey,
    addCarKey,
    updateCarKey,
    deleteCarKey
} from "../controler/carKey.js"

import {checkJWT} from "../middleware/identification/jwt.js";
import {manager} from '../middleware/authorization/mustBe.js';

const router = Router();

router.get("/info", checkJWT, manager, getCarKey);
router.post("/add", checkJWT, manager, addCarKey);
router.patch("/update",checkJWT, manager, updateCarKey);
router.delete("/delete", checkJWT, manager, deleteCarKey);

export default router;