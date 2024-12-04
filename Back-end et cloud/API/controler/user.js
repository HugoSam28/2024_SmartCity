import {pool} from "../database/database";

import * as userModel from "..model/user.js"
import jsonwebtoken from 'jsonwebtoken';
import { getUserByEmail } from "../model/user";

export const login = async (req,res) => {
  try {
    const person = await getUserByEmail(pool, req.val.email);
    if (person.id){
      const status = argon2.verify(person.password, password)  ?
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