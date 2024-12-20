import Router from 'express-promise-router';

import{
    getAllCarKeys,
    getAllCarKeysAndPagesCount,
    getSearchCarKeys,
    addCarKey,
    updateCarKey,
    deleteCarKeys
} from "../../controller/v1/carKey.js"

import {checkJWT} from "../../middleware/v1/identification/jwt.js";
import {admin} from '../../middleware/v1/authorization/mustBeAdmin.js';
import {
  pageValidatorMiddleware as PageVM,
  searchValidatorMiddleware as SVM,
  deleteValidatorMiddleware as DVM,
  orderValidatorMiddleware as OVM,
} from '../../middleware/v1/validation/validation.js';
import {
  addCarKeyValidatorMiddleware as ACKVM,
  updateCarKeyValidatorMiddleware as UCKVM
} from "../../middleware/v1/validation/carkey.js";

const router = Router();

router.get("/getAllKeys/:column/:iPage", checkJWT, admin, PageVM, OVM, getAllCarKeys);
router.get("/getAllKeysAndPagesCount/:column/:iPage", checkJWT, admin, PageVM, OVM, getAllCarKeysAndPagesCount);
router.get("/getSearchKeys/:search/:column/:iPage", checkJWT, admin, PageVM, SVM, OVM, getSearchCarKeys);

router.post("/add", checkJWT, admin, ACKVM, PageVM, OVM, addCarKey);

router.patch("/update",checkJWT, admin, UCKVM, PageVM, OVM, updateCarKey);

router.delete("/delete", checkJWT, admin, DVM, PageVM, OVM, deleteCarKeys);

export default router;