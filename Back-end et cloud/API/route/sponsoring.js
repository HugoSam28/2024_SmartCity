import Router from "express-promise-router";
import {
    getSponsoring,
    updateSponsoring,
    deleteSponsoring,
    addSponsoring
} from "../controller/sponsoring.js";

import {checkJWT} from "../middleware/identification/jwt.js";
import {manager} from '../middleware/authorization/mustBe.js';

const router = Router();

router.use("/info", checkJWT, manager, getSponsoring);
router.use("/add", checkJWT, manager, addSponsoring);
router.use("/delete", checkJWT, manager, deleteSponsoring);
router.use("/update", checkJWT, manager, updateSponsoring);

export default router;