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

static async getAll(req, res) {
  const getAllIncident = 'SELECT * FROM incidents where createdBy = $1';
  try {
    const { rows, rowCount } = await db.query(getAllIncident, [req.user.id]);
    return res.status(200).send({
      status: 200,
      data: [
        {
          data: rows,
        }
      ]
    });
  } 
  catch(error) {
    return res.status(400).send(error);
  }
}

static async updateLocation(req, res) {
  const updateLocationQuery = `UPDATE incidents SET location = $3 WHERE id = $1 AND createdBy = $2 AND status = $4
  returning *`;
  const values = [
    req.body.id,
    req.user.id,
    req.body.location,
    'draft'
  ];
  try{
    const { rows } = await db.query(updateLocationQuery, values);
    console.log(rows);
    return res.status(201).send({
      status: 201,
      data: [
        {
          id: rows[0].id,
          message: 'Updated Incident Records Location'
        }        
      ]
    })
    }
    catch(error) {
      return res.status(400).send(error);
    }
  }

  static async updateComment(req, res) {
    const updateCommentQuery = `UPDATE incidents SET comment = $4 WHERE id = $1 AND createdBy = $2 AND status = $3
    returning *`;
    const values = [
      req.body.id,
      req.user.id,
      'draft',
      req.body.comment
    ];
    try{
      const { rows } = await db.query(updateCommentQuery, values);
      return res.status(201).send({
        status: 201,
        data: [
          {
            id: rows[0].id,
            message: 'Updated Incident Records Comment'
          }        
        ]
      })
      }
      catch(error) {
        return res.status(400).send(error);
      }
    }

  static async delete(req, res) {		
    const deleteQuery = 'DELETE FROM incidents WHERE id=$1 AND createdBy = $2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'incident not found'});
      }
      return res.status(204).send({
        status: 204,
        data: [
          {
            id: rows[0].id,
            message: 'Incident record has been deleted'
          }
        ]
      });
    } 
    catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default Incident;