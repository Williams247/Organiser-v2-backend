import express, { Application } from 'express';
import {
  createActivties,
  deleteActivity,
  getActivities,
  getActivity,
  getActivityPercentage,
  updateActivity,
  deleteAllActivities,
} from '@controllers';
import {
  validateActivity,
  validateId,
  validateUpdateActivity,
  auth,
} from '@middleware';

const router: Application = express();

router.get('/get-activities', auth({ forAllUsers: true }), getActivities);

router.get('/get-acivity/:id', auth({ forAllUsers: true }), getActivity);

router.get(
  '/get-activity-percentage',
  auth({ forAllUsers: true }),
  getActivityPercentage
);

router.post(
  '/create-activity',
  auth({ forAllUsers: true }),
  validateActivity,
  createActivties
);

router.put(
  '/update-activity/:id',
  auth({ forAllUsers: true }),
  validateUpdateActivity,
  updateActivity
);

router.delete(
  '/delete-activity/:id',
  auth({ forAllUsers: true }),
  validateId,
  deleteActivity
);

router.delete(
  '/delete-all-activities',
  auth({ forAllUsers: true }),
  deleteAllActivities
);

export default router;
