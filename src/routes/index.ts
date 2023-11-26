import express, { Application } from 'express';
import activityControllers from './activities';
import authControllers from './auth';
import profileControllers from './profile';

const router: Application = express();

router.use('/activities', activityControllers);
router.use('/auth', authControllers);
router.use('/profile', profileControllers);

export const appRouter = router;
