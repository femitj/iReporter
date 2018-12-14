import express from 'express';
import userController from '../controllers/User';
import IncidentController from '../controllers/Incident';
import checkUser from '../helpers/userHelper'
import Auth from '../middleware/Auth';
import checkCommentInput from '../helpers/checkCommentInput';
import checkLocationInput from '../helpers/checkLocationInput';
import checkRecordInput from '../helpers/checkRecordInput';
import checkSignUpInput from '../helpers/checkSignUpInput';
import signInInput from '../helpers/signInInput';

const router = express.Router();

//USER ROUTES
// add a user
router.post('/api/v1/auth/users', checkUser, checkSignUpInput, userController.create);
// login a user
router.post('/api/v1/auth/login', checkUser, signInInput, userController.login);

//INTERVENTION ROUTE
// create intervention
router.post('/api/v1/incidents', Auth.verifyToken, checkRecordInput, IncidentController.create);
// get a specific incident:id
router.get('/api/v1/incidents/:id', Auth.verifyToken, IncidentController.get);
// get ALL incident
router.get('/api/v1/incidents', Auth.verifyToken, IncidentController.getAll);
// update location
router.patch('/api/v1/incidents/:id/location', Auth.verifyToken, checkLocationInput, IncidentController.updateLocation);
//update comment
router.patch('/api/v1/incidents/:id/comment', Auth.verifyToken, checkCommentInput, IncidentController.updateComment);
//delete a specific incident
router.delete('/api/v1/incidents/:id', Auth.verifyToken, IncidentController.delete);

module.exports = router;