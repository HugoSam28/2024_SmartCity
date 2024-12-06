import {Router} from 'express'

import{default as userRouter} from "./user.js"
import{default as sponsoringRouter} from "./sponsoring.js"
import{default as tripRouter} from "./trip.js"
import{default as vehicleRouter} from "./vehicule.js"
import{default as carKeyRouter} from "./carKey.js"
import {default as subscriptionRouter} from "./subscription.js"

const router = Router();

router.use("/user", userRouter);
router.use("/sponsoring", sponsoringRouter);
router.use("/trip", tripRouter);
router.use("/vehicle", vehicleRouter);
router.use("/carKey", carKeyRouter);
router.use("/subscription", subscriptionRouter);

export default router;