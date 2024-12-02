import Router from 'express-promise-router';
import {
    getClientInfo,
    updateClient,
    deleteClient,
    login,
    registration
} from "../controller/client.js";

import {checkJWT} from "../middleware/identification/jwt.js";
import {clientValidatorMiddleware as CVM} from "../middleware/validation.js";
import {manager} from '../middleware/authorization/mustBe.js';

const router = Router();

router.post("/registration", CVM.clientSchema, registration);
router.post("/login", CVM.login, login);
router.get("/info", checkJWT, getClientInfo);
router.patch("/update", checkJWT, CVM.update, updateClient);
router.delete("/delete", checkJWT, manager, CVM.delete, deleteClient);

export default router;