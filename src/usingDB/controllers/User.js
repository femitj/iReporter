import moment from 'moment';
import db from '../models/index';
import Helper from '../helpers/Helper';

const User = {
  // Create User
    async create(req, res) {
        if (!req.body.email || !req.body.password ) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
    
        if (!Helper.isValidEmail(req.body.email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }

        const hashPassword = Helper.hashPassword(req.body.password);
    
        const createQuery = `INSERT INTO
            users (email, password, firstname, lastname, username, created_date, modified_date)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            returning *`;
        const values = [
            req.body.email,
            hashPassword,
            req.body.firstname,
            req.body.lastname,
            req.body.username,
            moment(new Date()),
            moment(new Date())
        ];
    
        try {
            const { rows } = await db.query(createQuery, values);
            const token = Helper.generateToken(rows[0].id);
            return res.status(201).send({ 
                status: 201,
                data: [{
                    token: token,
                    user: rows,
                }]
            });
        } catch(error) {
            if (error.routine === '_bt_check_unique') {
            return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
            }
            return res.status(400).send(error);
        }
        },

    async login(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        if (!Helper.isValidEmail(req.body.email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }
        const text = 'SELECT * FROM users WHERE email = $1';
            try {
                const { rows } = await db.query(text, [req.body.email]);
                if (!rows[0]) {
                    return res.status(400).send({'message': 'The email you provided is incorrect'});
                }
                if(!Helper.comparePassword(rows[0].password, req.body.password)) {
                    return res.status(400).send({ 'message': 'The password you provided is incorrect' });
                }
                const token = Helper.generateToken(rows[0].id);
                    return res.status(200).send({             
                    status: 201,
                    data: [{
                        token: token,
                        user: rows,
                    }]
                });
            } catch(error) {
            return res.status(400).send(error)
            }
        }
}

export default User;