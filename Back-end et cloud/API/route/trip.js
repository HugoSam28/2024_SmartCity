import Router from 'express-promise-router';

import {
    getAllTrips,
    getOwnTrips,
    updateTrip,
    addTrip,
    startTrip,
    deleteTrips
} from "../controller/trip.js";

import {checkJWT} from "../middleware/identification/jwt.js";
import {admin} from '../middleware/authorization/mustBeAdmin.js';
import {
  pageValidatorMiddleware as PageVM,
  pageValidatorMiddleware as pageVM
} from '../middleware/validation/validation.js';
import {searchValidatorMiddleware as SVM} from '../middleware/validation/validation.js';
import { 
    startTripValidatorMiddelware as STVM,
    endTripValidatorMiddelware as ETVM
 } from '../middleware/validation/trip.js';

const router = Router();

router.get("/getAllTrips", checkJWT, admin, pageVM, getAllTrips); //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut)
router.get("/getAllTripsAndPagesCount", checkJWT, admin, pageVM ,getAllTripsAndPagesCount) //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut) + le nombres de pages
router.get("/getSearchTrips", checkJWT, admin, PageVM, SVM, getSearchTrips) //Champ de recherche sur les ligne

router.get("/getOwnTrips", checkJWT, getOwnTrips); //Récupération de nos voyages avec toutes les infos

router.patch("/update", checkJWT, admin, updateTrip);
router.patch("/endTrip", checkJWT, ETVM, updateTrip); // faire la fin du trip

router.post("/add", checkJWT, addTrip);
router.post("/startTrip", checkJWT, STVM, startTrip); //creer trip, vehicleNotavailable

router.delete("/delete", checkJWT, admin, deleteTrips);

export default router;