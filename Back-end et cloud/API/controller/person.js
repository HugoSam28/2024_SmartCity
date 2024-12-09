import {pool} from "../database/database.js";

import * as personModel from "../model/person.js";
import jwt from 'jsonwebtoken';
import {addSponsoring} from "../model/sponsoring.js";
import * as util from "../util/argon.js";

export const getMyInfos = async(req, res) => {
  try{
    const person = await personModel.getPersonById(pool, req.session);
    if(person){
      res.send(person);
    }
    else{
      res.sendStatus(404);
    }
  }
  catch(e){
    console.error(e);
    res.sendStatus(500);
  }
}

export const getAllPersons = async (req, res) => {
  try{
    const people = await personModel.getAllPersons(pool, req.val);
    if(people[0] !== undefined){
      res.status(200).send(people);
    }
    else{
      res.sendStatus(404);
    }
  }
  catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
}

export const updatePerson = async(req, res) =>{
  try {
    await personModel.updatePerson(pool, req.session.id, req.val);
    res.sendStatus(204);
  }
  catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
}

export const deletePersons = async(req, res) => {
  try{
    await personModel.deletePersons(pool, req.val);
    res.sendStatus(204);
  }
  catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
}

export const login = async (req,res) => {
  try {
    let userDetails = {id: null, role: null};
    const person = await personModel.getPersonByEmail(pool, req.val.email);
    if (person?.id){
      userDetails = await util.verify(req.val.password, person.password)  ?
      {id: person.id, role: person.role} : {id: null, role: null};
    }
    const token = jwt.sign({id: userDetails.id, role: userDetails.role}, process.env.JWTKEY, {expiresIn: "18h"} );
    res.send(token);
  } catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
}

export const registration = async (req, res) => {
  try {
    const idReferred = await personModel.addPerson(pool, req.val);
    if(req.val.referralCode) {
      let SQLClient;
      try {
        SQLClient = await pool.connect();
        await SQLClient.query("BEGIN");
        const idSponsor = await personModel.getPersonByReferralCode(SQLClient, req.val.referralCode);
        await addSponsoring(SQLClient, idSponsor, idReferred);
        await SQLClient.query(
          "UPDATE Person SET balance = balance+3 WHERE id IN ($1, $2)",
          [idSponsor, idReferred]);
        await SQLClient.query("COMMIT");
      } catch (error) {
        console.error(error);
        try {
          if(SQLClient){
            await SQLClient.query('ROLLBACK');
          }
        } catch (err) {
          console.error(err);
        } finally {
          res.sendStatus(500);
        }
      } finally {
        if(SQLClient){
          SQLClient.release();
        }
      }
    }
    res.status(201).send(`${idReferred}`);
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

