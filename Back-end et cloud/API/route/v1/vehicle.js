import Router from 'express-promise-router';

import{
    getAllVehicles,
    getAllVehiclesAndPagesCount,
    getSearchVehicles,
    getVehiclesAroundMe,
    getVehicleById,
    addVehicle,
    updateInformations,
    deleteVehicles
} from '../../controller/v1/vehicle.js';

import {admin} from '../../middleware/v1/authorization/mustBeAdmin.js';
import {checkJWT} from '../../middleware/v1/identification/jwt.js';
import {
  pageValidatorMiddleware as PageVM,
  searchValidatorMiddleware as SVM,
  deleteValidatorMiddleware as DVM,
  orderValidatorMiddleware as OVM,
} from '../../middleware/v1/validation/validation.js'
import {
  addVehicleValidatorMiddleware as AVVM,
  updateVehicleValidatorMiddleware as UVVM
} from "../../middleware/v1/validation/vehicle.js";


const router = Router();

router.get("/getAllVehicles", checkJWT, admin, PageVM, OVM, getAllVehicles); //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut)
router.get("/getAllVehiclesAndPagesCount",checkJWT, admin, PageVM, OVM, getAllVehiclesAndPagesCount) //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut) + le nombres de pages
router.get("/getSearchVehicles", checkJWT, admin, PageVM, SVM, getSearchVehicles) //Champ de recherche sur les ligne

router.get('/getAroundMe', getVehiclesAroundMe); //renvoie tout (map/list) --> tri par vehicle dans l'app
router.get('/getById', getVehicleById); //scan & click on map/list

router.post('/add', checkJWT, admin, AVVM, addVehicle);

router.patch('/update', checkJWT, admin, UVVM, updateInformations);

router.delete('/delete', checkJWT, admin, DVM, PageVM, deleteVehicles);

export default router