import express from 'express';
import userController from '../controllers/User';
import Auth from '../middleware/Auth';

const router = express.Router();


// add a user
router.post('/api/v1/auth/users', userController.create);


module.exports = router;