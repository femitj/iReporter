import db from "../models/index";
import Helper from "../helpers/Helper";
import { read } from "fs";

class Incident {

static async create(req, res) {

  const createQuery = `INSERT INTO
  incidents(type, comment, location, status, createdBy, createdOn)
  VALUES($1, $2, $3, $4, $5, $6)
  returning *`;

  const values = [
    req.body.type,
    req.body.comment,
    req.body.location,
    req.body.status,
    req.user.id,
    req.body.createdOn
  ];

  try {
    const { rows } = await db.query(createQuery, values);
    console.log('here')
    return res.status(201).send({
      status: 201,
      data: [
        {
          id: rows[0].id,
          message: 'Created Incident record'
        }        
      ]
    })
  } 
  catch(error) {
    return res.status(400).send(error);
  }
}

static async get(req, res) {
  const text = 'SELECT * FROM incidents WHERE id = $1 AND createdBy = $2';
  try {
    const { rows } = await db.query(text, [req.params.id, req.user.id]);
    if (!rows[0]) {
      return res.status(404).send({'message': 'incident not found'});
    }
    return res.status(200).send({
      status: 200,
      data: [
        {
          data: rows[0],
        }
      ]
    })
  } 
  catch(error) {
    return res.status(400).send(error)
  }
}



}

export default Incident;