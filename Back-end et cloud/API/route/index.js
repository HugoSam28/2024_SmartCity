import {Router} from 'express'

import{default as personRouter} from "./person.js"
import{default as sponsoringRouter} from "./sponsoring.js"
import{default as tripRouter} from "./trip.js"
import{default as vehicleRouter} from "./vehicle.js"
import{default as carKeyRouter} from "./carKey.js"
import {default as subscriptionRouter} from "./subscription.js"

const router = Router();

router.use("/person", personRouter);
router.use("/sponsoring", sponsoringRouter);
router.use("/trip", tripRouter);
router.use("/vehicle", vehicleRouter);
router.use("/carKey", carKeyRouter);
router.use("/subscription", subscriptionRouter);

export default router;