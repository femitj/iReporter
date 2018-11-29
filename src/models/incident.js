import moment from 'moment';
import uuid from 'uuid';

class Incident {
    constructor() {
        this.incidents = [];
    }

    create(data) {
        const newIncident = {
            id: uuid.v4(),
            createdOn: moment.now(),
            type: data.type || '',
            location: data.location || '',
            status: data.status || '',
            comment: data.comment || '',
            modifiedDate: moment.now()
        };

        this.incidents.push(newIncident);
        return newIncident
    }

    findAll() {
        return this.incidents;
    }

    findOne(id) {
        return this.incidents.find(incident => incident.id === id);
    }
}

export default new Incident();