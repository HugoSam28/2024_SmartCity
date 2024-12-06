import Router from "express-promise-router";

import {
    getSponsorings,
    addSponsoring,
    updateSponsoring,
    deleteSponsorings
} from "../controller/sponsoring.js";

import {checkJWT} from "../middleware/identification/jwt.js";
import {admin} from '../middleware/authorization/mustBeAdmin.js';

const router = Router();

router.use("/getSponsorings", checkJWT, admin, getSponsorings);

router.use("/add", checkJWT, addSponsoring);

router.use("/update", checkJWT, admin, updateSponsoring);

router.use("/delete", checkJWT, admin, deleteSponsorings);

export default router;

//A REVOIR CAR PAS SUR DE COMMENT ON VA L'UTILISER