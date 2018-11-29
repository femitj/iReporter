import express from 'express';
import RedFlagRecord from '../controllers/RedFlagRecord';

const router = express.Router();

// create a red-flag record
router.post('/api/v1/red-flags', RedFlagRecord.create);

module.exports = router;