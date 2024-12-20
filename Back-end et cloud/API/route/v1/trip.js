import Router from 'express-promise-router';

import {
    getAllTrips,
    getAllTripsAndPagesCount,
    getSearchTrips,
    getOwnTrips,
    startTrip,
    endTrip,
    addTrip,
    updateTrip,
    deleteTrips
} from "../../controller/v1/trip.js";

import {checkJWT} from "../../middleware/v1/identification/jwt.js";
import {admin} from '../../middleware/v1/authorization/mustBeAdmin.js';
import {
  pageValidatorMiddleware as PageVM,
  searchValidatorMiddleware as SVM,
  deleteValidatorMiddleware as DVM,
  orderValidatorMiddleware as OVM,
} from '../../middleware/v1/validation/validation.js';
import {
    startTripValidatorMiddelware as STVM,
    endTripValidatorMiddelware as ETVM,
    addTripValidatorMiddelware as ATVM,
    updateTripValidatorMiddelware as UTVM
 } from '../../middleware/v1/validation/trip.js';

const router = Router();

router.get("/getAllTrips/:column/:iPage", checkJWT, admin, PageVM, OVM, getAllTrips);
router.get("/getAllTripsAndPagesCount/:column/:iPage", checkJWT, admin, PageVM, OVM, getAllTripsAndPagesCount);
router.get("/getSearchTrips/:search/:column/:iPage", checkJWT, admin, PageVM, SVM, OVM, getSearchTrips);

router.get("/getOwnTrips", checkJWT, getOwnTrips);

router.post("/startTrip", checkJWT, STVM, startTrip);
router.patch("/endTrip", checkJWT, ETVM, endTrip);

router.post("/add", checkJWT, admin, ATVM, PageVM, OVM, addTrip);
router.patch("/update", checkJWT, admin, UTVM, PageVM, OVM, updateTrip);
router.delete("/delete", checkJWT, admin, DVM, PageVM, OVM, deleteTrips);

export default router;