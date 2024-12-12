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
} from "../../controller/trip.js";

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
    endTripValidatorMiddelware as ETVM
 } from '../../middleware/v1/validation/trip.js';

const router = Router();

router.get("/getAllTrips", checkJWT, admin, PageVM, OVM, getAllTrips); //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut)
router.get("/getAllTripsAndPagesCount", checkJWT, admin, PageVM, OVM, getAllTripsAndPagesCount) //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut) + le nombres de pages
router.get("/getSearchTrips", checkJWT, admin, PageVM, SVM, OVM, getSearchTrips) //Champ de recherche sur les ligne

router.get("/getOwnTrips", checkJWT, getOwnTrips); //Récupération de nos voyages avec toutes les infos

router.post("/startTrip", checkJWT, STVM, startTrip); //creer trip, vehicleNotavailable
router.patch("/endTrip", checkJWT, ETVM, endTrip); // faire la fin du trip

router.post("/add", checkJWT, addTrip);
router.patch("/update", checkJWT, admin, updateTrip);
router.delete("/delete", checkJWT, admin, DVM, PageVM, deleteTrips);

export default router;