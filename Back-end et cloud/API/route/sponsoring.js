import Router from "express-promise-router";
import {
    getSponsoring,
    updateSponsoring,
    deleteSponsoring,
    addSponsoring
} from "../controller/sponsoring.js";

import {checkJWT} from "../middleware/identification/jwt.js";
import {admin} from '../middleware/authorization/mustBeAdmin.js';

const router = Router();

router.use("/info", checkJWT, admin, getSponsoring);
router.use("/add", checkJWT, admin, addSponsoring);
router.use("/delete", checkJWT, admin, deleteSponsoring);
router.use("/update", checkJWT, admin, updateSponsoring);

export default router;