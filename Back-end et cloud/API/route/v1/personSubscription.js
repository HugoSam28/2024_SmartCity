import Router from 'express-promise-router';

import {
    getAllPersonSubscriptions,
    getAllPersonSubscriptionsAndPagesCount,
    getSearchPersonSubscriptions,
    getOwnSubscription,
    addOwnSubscription,
    addPersonSubscription,
    updatePersonSubscription,
    deletePersonSubscription
} from "../../controller/v1/personSubscription.js";

import {checkJWT} from "../../middleware/v1/identification/jwt.js";
import {admin} from '../../middleware/v1/authorization/mustBeAdmin.js';
import {
    pageValidatorMiddleware as PageVM,
    searchValidatorMiddleware as SVM,
    deleteValidatorMiddleware as DVM,
    orderValidatorMiddleware as OVM
} from "../../middleware/v1/validation/validation.js";
import {
  addPersonSubscriptionValidatorMiddleware as APSVM,
  updatePersonSubscriptionalidatorMiddleware as UPSVM
} from "../../middleware/v1/validation/personSubscription.js";

const router = Router();
router.get("/getAllPersonSubscriptions/:column/:iPage", checkJWT, admin, PageVM, OVM, getAllPersonSubscriptions);
router.get("/getAllPersonSubscriptionsAndPagesCount/:column/:iPage", checkJWT, admin, PageVM, OVM, getAllPersonSubscriptionsAndPagesCount);
router.get("/getSearchPersonSubscriptions/:search/:column/:iPage", checkJWT, admin, PageVM, SVM, OVM, getSearchPersonSubscriptions);

router.get("/getOwnSubscription", checkJWT, getOwnSubscription);
router.post("/addOwnSubscription", checkJWT, APSVM, addOwnSubscription);

router.post("/add", checkJWT, admin, APSVM, PageVM, OVM, addPersonSubscription);
router.patch("/update", checkJWT, admin, UPSVM, PageVM, OVM, updatePersonSubscription);
router.delete("/delete", checkJWT, admin, DVM, PageVM, OVM, deletePersonSubscription);

export default router;