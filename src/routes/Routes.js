import express from 'express';
import userController from '../controllers/User';
import IncidentController from '../controllers/Incident';
import checkUser from '../helpers/userHelper'
import Auth from '../middleware/Auth';

const router = express.Router();

//USER ROUTES
// add a user
router.post('/api/v1/auth/users', checkUser, userController.create);
// login a user
router.post('/api/v1/auth/login', checkUser, userController.login);

//INTERVENTION ROUTE
// create intervention
router.post('/api/v1/interventions', Auth.verifyToken, IncidentController.create);

module.exports = router;