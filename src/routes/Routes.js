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
router.post('/api/v1/incidents', Auth.verifyToken, IncidentController.create);
// get a specific incident:id
router.get('/api/v1/incidents/:id', Auth.verifyToken, IncidentController.get);
// get ALL incident
router.get('/api/v1/incidents', Auth.verifyToken, IncidentController.getAll);
// update location
router.patch('/api/v1/incidents/:id/location', Auth.verifyToken, IncidentController.updateLocation);
//update comment
router.patch('/api/v1/incidents/:id/comment', Auth.verifyToken, IncidentController.updateComment);

module.exports = router;