import RedFlagRecordModel from '../models/incident';

const RedFlagRecord = {
    create(req, res) {
        if (!req.body.type && !req.body.comment && !req.body.location) {
            return res.status(400).send({'message': 'All fields are required'})
        }
        const redFlagRecord = RedFlagRecordModel.create(req.body);
        return res.status(201).send(redFlagRecord); 
    },

    
    getAll(req, res) {
        const redFlagRecords = RedFlagRecordModel.findAll();
        return res.status(200).send(redFlagRecords);
    },

    getOne(req, res) {
        const redFlagRecord = RedFlagRecordModel.findOne(req.params.id);
        if (!redFlagRecord) {
            return res.status(404).send({'message': 'red flag record not found'});
        }
        return res.status(200).send(redFlagRecord);
    },

    update(req, res) {
        const redFlagRecord = RedFlagRecordModel.findOne(req.params.id);
        if (!redFlagRecord) {
          return res.status(404).send({'message': 'red flag record not found'});
        }
        const updatedRedFLagRecord = RedFlagRecordModel.update(req.params.id, req.body)
        return res.status(200).send(updatedRedFlagRecord);
    },

    delete(req, res) {
        const redFlagRecord = RedFlagRecordModel.findOne(req.params.id);
        if (!redFlagRecord) {
          return res.status(404).send({'message': 'red flag record not found'});
        }
        const ref = RedFlagRecordModel.delete(req.params.id);
        return res.status(204).send(ref);
      }
    
}

export default RedFlagRecord;