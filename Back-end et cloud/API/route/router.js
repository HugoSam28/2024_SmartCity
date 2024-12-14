import {Router} from 'express'
import {default as r1} from './v1/index.js';

const router = Router();

router.use('/v1', r1);

export default router;