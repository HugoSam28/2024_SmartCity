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
import {userValidatorMiddleware as CVM} from "../middleware/validation/user.js";
import {admin} from '../middleware/authorization/mustBeAdmin.js';

const router = Router();

router.post("/registration", registration);
router.post("/login", login);
router.get("/info", checkJWT, getUserInfo);
router.get("/getAllUsers", checkJWT, admin, getAllUsers);
router.patch("/update", checkJWT, updateUser);
router.delete("/deleteUsers", checkJWT, admin, deleteUsers);

export default router;