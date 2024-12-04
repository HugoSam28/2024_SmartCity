import Router from 'express-promise-router';

import{
    getAllVehicles,
    getVehiclesAroundPosition,
    getVehicleById,
    addVehicle,
    updateStatus,
    updateInformations,
    deleteVehicles
} from '../controller./vehicle';

import {admin} from '../middleware/authorization/mustBeAdmin.js';
import {checkJWT} from '../middleware/identification/jwt.js';

const router = Router();

router.get('/getAllVehicles', checkJWT, admin, getAllVehicles);
router.get('/getAroundUs', getVehiclesAroundPosition);
router.get('/getVehicleById', getVehicleById);

router.post('/addVehicle', checkJWT, admin, addVehicle);

router.patch('/updateStatus', checkJWT, updateStatus);
router.patch('/updateInformations', checkJWT, admin, updateInformations);

router.delete('/deleteVehicles', checkJWT, admin, deleteVehicles);

export default router