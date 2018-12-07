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
            images: ['Image,Image'],
            videos: ['Video, Video'],
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

    update(id,data) {
        const incident = this.findOne(id);
        const index = this.incidents.indexOf(incident);
        this.incidents[index].type = data['type'] || incident.type;
        this.incidents[index].location = data['location'] || incident.location;
        this.incidents[index].status = data['status'] || incident.status;
        this.incidents[index].comment = data['comment'] || incident.comment;
        this.incidents[index].modifiedDate = moment.now()
        return this.incidents[index];
    }

    updateLocation(id,data) {
        const incident = this.findOne(id);
        const index = this.incidents.indexOf(incident);
        this.incidents[index].location = data['location'] || incident.location;
        return this.incidents[index];
    }

    updateComment(id,data) {
        const incident = this.findOne(id);
        const index = this.incidents.indexOf(incident);
        this.incidents[index].comment = data['comment'] || incident.comment;
        return this.incidents[index];
    }

    delete(id) {
        const incident = this.findOne(id);
        const index = this.incidents.indexOf(incident);
        this.incidents.splice(index, 1);
        return {};
    }
}

export default new Incident();