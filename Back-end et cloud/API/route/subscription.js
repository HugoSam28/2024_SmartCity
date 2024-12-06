import Router from 'express-promise-router';

import {
    getAllSubscriptions,
    getSubscriptionById,
    addSubscription,
    updateSubscription,
    deleteSubscriptions

} from "../controller/trip.js";

import {checkJWT} from "../middleware/identification/jwt.js";
import {admin} from '../middleware/authorization/mustBeAdmin.js';

const router = Router();

router.get("/getAllSubscriptions", checkJWT, getAllSubscriptions);
router.get("/getSubscriptionById", checkJWT, getSubscriptionById);

router.post("/add", checkJWT, admin, addSubscription);

router.patch("/update", checkJWT, admin, updateSubscription);

router.delete("/delete", checkJWT, admin, deleteSubscriptions);

export default router;