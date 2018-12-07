import RedFlagRecordModel from '../models/incident';

const RedFlagRecord = {
    create(req, res) {
        if (!req.body.type || !req.body.comment || !req.body.location) {
            return res.status(400).send({'message': 'All fields are required'})
        }
        const redFlagRecord = RedFlagRecordModel.create(req.body);
        return res.status(201).send(redFlagRecord); 
    },

    
    getAll(req, res) {
        const redFlagRecords = RedFlagRecordModel.findAll();
        return res.status(200).json({
            status: 200,
            data: redFlagRecords,
          });
    },

    getOne(req, res) {
        const redFlagRecord = RedFlagRecordModel.findOne(req.params.id);
        if (!redFlagRecord) {
            return res.status(404).send({'message': 'red flag record not found'});
        }
        return res.status(200).json({
            status: 200,
            data: redFlagRecord,
          });
    },

    update(req, res) {
        const redFlagRecord = RedFlagRecordModel.findOne(req.params.id);
        if (!redFlagRecord) {
          return res.status(404).send({'message': 'red flag record not found'});
        }
        const updatedRedFlagRecord = RedFlagRecordModel.update(req.params.id, req.body)
        return res.status(200).json({
            status: 200,
            data: updatedRedFlagRecord,
          });
    },

    updateLocation(req, res) {
        const redFlagRecord = RedFlagRecordModel.findOne(req.params.id);
        if (!redFlagRecord) {
          return res.status(404).send({'message': 'red flag record not found'});
        }
        const updatedRedFlagRecord = RedFlagRecordModel.updateLocation(req.params.id, req.body)
        
        return res.status(200).json({
            status: 200,
            id : req.params.id, // red-flag record primary key
            message : "Updated red-flag record's location",
          });
    },

    updateComment(req, res) {
        const redFlagRecord = RedFlagRecordModel.findOne(req.params.id);
        if (!redFlagRecord) {
          return res.status(404).send({'message': 'red flag record not found'});
        }
        const updatedRedFlagRecord = RedFlagRecordModel.updateComment(req.params.id, req.body)
        return res.status(200).json({
            status: 200,
            id : req.params.id, // red-flag record primary key
            message : "Updated red-flag record's comment",
        });
    },
 

    delete(req, res) {
        const redFlagRecord = RedFlagRecordModel.findOne(req.params.id);
        if (!redFlagRecord) {
          return res.status(404).send({'message': 'red flag record not found'});
        }
        const ref = RedFlagRecordModel.delete(req.params.id);
        return res.status(200).json({
            status: 200,
            id: req.params.id, // red-flag record primary key
            message : "red-flag record has been deleted",
        });
      }
    
}

export default RedFlagRecord;