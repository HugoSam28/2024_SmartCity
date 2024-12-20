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
  updateVehicleValidatorMiddleware as UVVM,
  latLonValidatorMiddleware as LLVM,
  vehicleIdValidatorMiddleware as VIVM
} from "../../middleware/v1/validation/vehicle.js";


const router = Router();

router.get("/getAllVehicles/:column/:iPage", checkJWT, admin, PageVM, OVM, getAllVehicles);
router.get("/getAllVehiclesAndPagesCount/:column/:iPage",checkJWT, admin, PageVM, OVM, getAllVehiclesAndPagesCount);
router.get("/getSearchVehicles/:search/:column/:iPage", checkJWT, admin, PageVM, SVM, OVM, getSearchVehicles);

router.get('/getAroundMe', checkJWT, LLVM, getVehiclesAroundMe);
router.get('/getById', checkJWT, VIVM, getVehicleById);

router.post('/add', checkJWT, admin, AVVM, PageVM, OVM, addVehicle);

router.patch('/update', checkJWT, admin, UVVM, PageVM, OVM, updateInformations);

router.delete('/delete', checkJWT, admin, DVM, PageVM, OVM, deleteVehicles);

export default router