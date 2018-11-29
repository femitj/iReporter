import RedFlagRecordModel from '../models/incident';

const RedFlagRecord = {
    create(req, res) {
        if (!req.body.type && !req.body.comment && !req.body.location) {
            return res.status(400).send({'message': 'All fields are required'})
        }
        const redFlagRecord = RedFlagRecordModel.create(req.body);
        return res.status(201).send(redFlagRecord); 
    }
}

export default RedFlagRecord;