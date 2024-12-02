import {Router} from 'express'

import{default as clientRouter} from "./client.js"
import{default as sponsoringRouter} from "./sponsoring.js"
import{default as tripRouter} from "./trip.js"
import{default as vehicleRouter} from "./vehicle.js"
import{default as carKeyRouter} from "./carKey.js"

const router = Router();

router.use("/client", clientRouter);
router.use("/sponsoring", sponsoringRouter);
router.use("/trip", tripRouter);
router.use("/vehicle", vehicleRouter);
router.use("/carKey", carKeyRouter);

export default router;