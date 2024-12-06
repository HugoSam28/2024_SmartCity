import Router from 'express-promise-router';
import {
    getUserInfo,
    getAllUsers,
    updateUser,
    deleteUsers,
    login,
    registration
} from "../controller/user.js";

import {checkJWT} from "../middleware/identification/jwt.js";
import {
    userValidatorMiddleware as UVM,
    userUpdateValidatiorMiddleware as UUVM,
    loginValidatorMiddleware as LVM
    } from "../middleware/validation/user.js";
import {admin} from '../middleware/authorization/mustBeAdmin.js';

const router = Router();

router.post("/registration", UVM, registration);
router.post("/login", LVM, login);

router.get("/info", checkJWT, getUserInfo);
router.get("/getAllUsers", checkJWT, admin, getAllUsers);

router.patch("/update", checkJWT, UUVM, updateUser);

router.delete("/delete", checkJWT, UUVM, admin, deleteUsers);

export default router;