import {pool} from "../database/database";

import * as userModel from "../model/user"
import jsonwebtoken from 'jsonwebtoken';
import * as argon2 from "node/crypto";
import {addSponsoring} from "../model/sponsoring";

export const login = async (req,res) => {
  try {
    const person = await userModel.getUserByEmail(pool, req.val.email);
    if (person.id){
      const status = argon2.verify(person.password, req.val.password)  ?
      {id: person.id, role: person.role} : {id: null, role: null};
      const jeton = jsonwebtoken.sign({id: status.id, role: status.role}, process.env.JWTKEY, {expiresIn: "18h"} );
      res.status(201).send(jeton);
    }
    res.sendStatus(404);
  } catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
}

export const registration = async (req,res) => {
  //créer le client d'office, en revanche pour le parrainage on effectue une transaction
  try {
    const {id: referred} = await userModel.registration(pool, req.val);
    if(req.val.referralCode) {
      let SQLClient;
      try {
        SQLClient = await pool.connect();
        await SQLClient.query("BEGIN");
        const {id: sponsor} = await userModel.getUserByReferralCode(SQLClient, req.val.referralCode);
        await addSponsoring(SQLClient, {sponsor, referred});
        await SQLClient.query(
          "UPDATE user SET balance = balance+3 WHERE id IN ($1, $2)",
          [sponsor, referred]);
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