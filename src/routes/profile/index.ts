import express, { Application } from 'express';
import { getProfile, updateProfile } from '@controllers';
import { validateProfile, auth } from '@middleware';

const router: Application = express();

router.get('/fetch-profile', auth({ forAllUsers: true }), getProfile);
router.put(
  '/update-profile',
  auth({ forAllUsers: true }),
  validateProfile,
  updateProfile
);

export default router;
