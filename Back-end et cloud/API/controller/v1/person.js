import {pool} from "../../database/database.js";

import * as personModel from "../../model/v1/person.js";
import jwt from 'jsonwebtoken';
import {addSponsoring} from "../../model/v1/sponsoring.js";
import * as util from "../../util/argon.js";

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
    res.status(201).send({idReferred});
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

export const login = async (req,res) => {
  try {
    let userDetails = {id: null, role: null};
    const person = await personModel.getPersonByEmail(pool, req.val.email);
    if (person?.id && await util.verify(req.val.password, person.password)){
      userDetails = {id: person.id, role: person.role};
    }
    const token = jwt.sign(userDetails, process.env.JWTKEY, {expiresIn: "18h"} );
    res.status(201).send(token);
  } catch(e) {
    res.status(500).send(e.message);
  }
}

export const getMyInfos = async(req, res) => {
  try{
    const person = await personModel.getPersonById(pool, req.session.id); //session.id vu que CheckJWT met dans req.session.id
    if(person){
      res.send(person);
    }
    else{
      res.sendStatus(404);
    }
  }
  catch(e){
    res.status(500).send(e.message);
  }
}

export const getProfileInfos = async(req, res) => {
  try{
    const person = await personModel.getProfileInfosById(pool, req.session.id); //session.id vu que CheckJWT met dans req.session.id
    if(person){
      res.send(person);
    }
    else{
      res.sendStatus(404);
    }
  }
  catch(e){
    res.status(500).send(e.message);
  }
}

export const getAllPersons = async (req, res) => {
  try{
    const people = await personModel.getAllPersons(pool, req.val.page, req.val.order);
    if(people){
      res.send(people);
    }
    else{
      res.sendStatus(404);
    }
  }
  catch(e) {
    res.status(500).send(e.message);
  }
}


export const getAllPersonsAndPagesCount = async(req, res) => {
  try{
    const result = {};
    result.persons = await personModel.getAllPersons(pool, req.val.page, req.val.order);
    result.nbPagesPersons = Math.ceil((await personModel.personsCount(pool))/10);
    if(result.persons && result.nbPagesPersons){
        res.send(result);
    }
    else{
        res.sendStatus(404);
    }
  }
  catch(e){
    res.status(500).send(e.message);
  }
}

export const getSearchPersons = async(req, res) => {
  try{
    const result = {};
    result.persons = await personModel.getSearchPersons(pool, req.val.page, req.val.search, req.val.order);
    result.nbPagesPersons = Math.ceil((await personModel.personsSearchCount(pool, req.val.search))/10);
    if(result.persons[0] && result.nbPagesPersons){
        res.send(result);
    }
    else{
        res.sendStatus(404);
    }
  }
  catch(e){
    res.status(500).send(e.message);
  }
}

export const updateMySelf = async(req, res) => {
  try{
    await personModel.updateMySelf(pool, req.val);
    const people = await personModel.getAllPersons(pool, req.val.page, req.val.order)
    res.send(people);
  }
  catch(e){
    res.status(500).send(e.message);
  }
}

export const updatePerson = async(req, res) => {
  try{
    await personModel.updatePerson(pool, req.val);
    const people = await personModel.getAllPersons(pool, req.val.page, req.val.order)
    res.send(people);
  }
  catch(e){
    res.status(500).send(e.message);
  }
}

export const updatePersonalBalance = async(req, res) =>{
  try{
    const balance = await personModel.updatePersonalBalance(pool, req.val);
    if(balance){
      res.send(balance);
    }
    else{
      res.sendStatus(404);
    }
  }
  catch(e){
    res.status(500).send(e.message);
  }
}

export const deletePersons = async(req, res) => {
  try{
    await personModel.deletePersons(pool, req.val.del);
    const result= {};
    result.persons = await personModel.getAllPersons(pool, req.val.page, req.val.order);
    if(!result.keys[0]){
      result.persons = await personModel.getAllPersons(pool, {iPage: req.val.page.iPage - 1}, req.val.order);
    }
    result.nbPagesPersons = Math.ceil((await personModel.personsCount(pool))/10);
    if(result.persons[0] && result.nbPagesPersons){
      res.send(result);
    }
    else {
      res.sendStatus(404);
    }
  }
  catch(e){
    res.status(500).send(e.message);
  }
}



