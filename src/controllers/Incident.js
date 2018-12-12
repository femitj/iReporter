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
}

export default Incident;