import Router from "express-promise-router";

import {
    getAllSponsorings,
    addSponsoring,
    updateSponsoring,
    deleteSponsorings
} from "../controller/sponsoring.js";

import {checkJWT} from "../middleware/identification/jwt.js";
import {admin} from '../middleware/authorization/mustBeAdmin.js';
import {pageValidator} from '../middleware/validation/validation.js';


const router = Router();

router.use("/getAllSponsorings", checkJWT, admin, pageValidator, getAllSponsorings);

router.use("/add", checkJWT, addSponsoring);

router.use("/update", checkJWT, admin, updateSponsoring);

router.use("/delete", checkJWT, admin, deleteSponsorings);

export default router;

//A REVOIR CAR PAS SUR DE COMMENT ON VA L'UTILISER