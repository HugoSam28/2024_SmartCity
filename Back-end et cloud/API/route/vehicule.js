import Router from 'express-promise-router';

import{
    getAllVehicles,
    getVehiclesAroundMe,
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
router.get('/getAroundUs', getVehiclesAroundMe);
router.get('/getById', getVehicleById);

router.post('/add', checkJWT, admin, addVehicle);

router.patch('/updateStatus', checkJWT, updateStatus);
router.patch('/update', checkJWT, admin, updateInformations);

router.delete('/delete', checkJWT, admin, deleteVehicles);

export default router