import {pool} from "../database/database";

import * as personModel from "../model/person";
import jsonwebtoken from 'jsonwebtoken';
import * as argon2 from "node/crypto";
import {addSponsoring} from "../model/sponsoring";

export const getPersonById = async(req, res) => {
  try{
    const person = await personModel.getPersonById(pool, req.val);
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

export const getAllPersons = async(res, res) => {
  try{
    people = await personModel.getAllPersons(pool, req.val);
    if(people){
      res.send(people);
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
    const person = await personModel.getPersonByEmail(pool, req.val.email);
    if (person.id){
      const status = argon2.verify(person.password, req.val.password)  ?
      {id: person.id, role: person.role} : {id: null, role: null};
      const token = jsonwebtoken.sign({id: status.id, role: status.role}, process.env.JWTKEY, {expiresIn: "18h"} );
      res.status(201).send(token);
    }
    res.sendStatus(404);
  } catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
}

export const registration = async (req,res) => {
  try {
    const idReferred = await personModel.addPerson(pool, req.val);
    if(req.val.referralCode) {
      let SQLClient;
      try {
        SQLClient = await pool.connect();
        await SQLClient.query("BEGIN");
        const idSponsor = await personModel.getPersonByReferralCode(SQLClient, req.val.referralCode);
        await addSponsoring(SQLClient, {idSponsor, idReferred});
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
    res.sendStatus(201);
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

