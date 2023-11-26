import express, { Application } from 'express';
import { register, login } from '@controllers';
import { validateAuthRegister, validateAuthLogin } from '@middleware';

const router: Application = express();

router.post('/register', validateAuthRegister, register);
router.post('/login', validateAuthLogin, login);

export default router;
