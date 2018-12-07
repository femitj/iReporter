import express from 'express';
import RedFlagRecord from '../controllers/RedFlagRecord';
import checkLocation from '../helpers/checks';

const router = express.Router();

// create a red-flag record
router.post('/api/v1/red-flags', RedFlagRecord.create);

// get all red-flag record
router.get('/api/v1/red-flags', RedFlagRecord.getAll);

// get a specific red-flag record
router.get('/api/v1/red-flags/:id', RedFlagRecord.getOne);

// edit a specific red-flag record.
router.put('/api/v1/red-flags/:id', RedFlagRecord.update);

router.patch('/api/v1/red-flags/:id/location',checkLocation ,RedFlagRecord.updateLocation);

router.patch('/api/v1/red-flags/:id/comment', RedFlagRecord.updateComment);

// delete a red-flag record
router.delete('/api/v1/red-flags/:id', RedFlagRecord.delete);

module.exports = router;