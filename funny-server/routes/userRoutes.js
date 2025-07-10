import {Router} from 'express';
import {register,uploadDetails, details} from '../controllers/userController.js'

const router = Router();

router.post('/register',register);
router.post('/upload',uploadDetails);
router.get('/me', details)

export default router;