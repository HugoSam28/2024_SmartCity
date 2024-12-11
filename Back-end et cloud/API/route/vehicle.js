import Router from 'express-promise-router';

import{
    getAllVehicles,
    getVehiclesAroundMe,
    getVehicleById,
    addVehicle,
    updateInformations,
    deleteVehicles
} from '../controller/vehicle.js';

import {admin} from '../middleware/authorization/mustBeAdmin.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import {
  pageValidatorMiddleware as PageVM,
  searchValidatorMiddleware as SVM
} from '../middleware/validation/validation.js'


const router = Router();

router.get("/getAllVehicles", checkJWT, admin, PageVM, getAllVehicles); //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut)
router.get("/getAllVehiclesAndPagesCount", ) //Récupère toutes les lignes en les triant sur la colonne choisie (avec une par défaut) + le nombres de pages 
router.get("/getSearchVehicles", checkJWT, admin, PageVM, SVM, ) //Champ de recherche sur les ligne

router.get('/getAroundUs', getVehiclesAroundMe); //renvoie tout (map/list) --> tri par vehicle dans l'app
router.get('/getById', getVehicleById); //scan & click on map/list

router.post('/add', checkJWT, admin, addVehicle);

router.patch('/update', checkJWT, admin, updateInformations);

router.delete('/delete', checkJWT, admin, deleteVehicles);

export default router