import { signUpValidation } from "../schemas/signUpValidation.js";
import bcrypt from "bcrypt";
import { db } from "../config/database.js"

export async function postSignUp(req,res)
    {
        const user = req.body;
        const passwordHash = bcrypt.hashSync(user.password, 5);
        const validate = signUpValidation.validate(user, { abortEarly: true });
        if (validate.error) {
            res.status(422).send(validate.error);
            return;
        }
        try{
            const signUpVerify = await db.collection('users').findOne({email: user.email})
            if(signUpVerify){
                res.status(409).send('Este email já foi cadastrado anteriormente')
                return;
            }  
            await db.collection('users').insertOne({email:user.email, name: user.name, password: passwordHash});
            res.status(201).send('Usuário cadastrado com sucesso')
        }
        catch(err){
            console.log(err);
        }
      }
