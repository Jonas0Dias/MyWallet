import { loginValidation } from "../schemas/loginValidation.js";
import bcrypt from "bcrypt";
import { db } from "../config/database.js"

export async function postLogin(req,res)
    {
        const user = req.body
        const validate = loginValidation.validate(user, { abortEarly: true })
        console.log(user)
        
        if (validate.error){
          res.status(422).send(validate.error.details);
          return;
        }
        try{
          const uservalidation = await db.collection('users').findOne({email: user.email});
          console.log(uservalidation)
          const match = await  bcrypt.compare(user.password, uservalidation.password)
          if (!uservalidation || !match){
              res.status(422).send('email ou senha incorretos');
              return;
          }else{
              res.status(200).send({id : uservalidation._id, name: uservalidation.name});//precisa pegar o id la no front
              return;
          }
        }catch(err){
          res.send(err)
        }
      }
