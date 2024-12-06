import Router from 'express-promise-router';

import {
    getAllTrips,
    getOwnTrips,
    updateTrip,
    addTrip,
    deleteTrips
} from "../controller/trip.js";

import {checkJWT} from "../middleware/identification/jwt.js";
import {admin} from '../middleware/authorization/mustBeAdmin.js';

const router = Router();

router.get("/getAllTrips", checkJWT, admin, getAllTrips);
router.get("/getOwnTrips", checkJWT, getOwnTrips);

router.patch("/update", checkJWT, admin, updateTrip);

router.post("/add", checkJWT, addTrip);

router.delete("/delete", checkJWT, admin, deleteTrips);

export default router;