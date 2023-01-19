import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import Joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from 'uuid';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
await mongoClient.connect();
} catch (err) {
console.log("Erro no mongo.conect", err.message);
}

db = mongoClient.db();
const users = db.collection("users"); //cria a coleção users

const loginValidation = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

const signUpValidation = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    passwordConfirmation: Joi.string().valid(Joi.ref("password")).required()
  });




// ROTAS:

app.post('/login', async (req, res) => {
  const user = req.body
  const validate = loginValidation.validate(user, { abortEarly: true })

  if (validate.error){
    res.status(422).send(validate.error.details);
    return;
  }
  try{
    uservalidation = await db.collection('users').findOne(user);
    if (!uservalidation || user.password!==uservalidation.password){
        res.status(422).send('email ou senha incorretos');
        return;
    }else{
        res.status(200).send();
        return;
    }
  }catch(err){
    res.send(err)
  }
})

app.post('/signup', async (req, res) => {
    const user = req.body;
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
        await db.collection('users').insertOne(user);
        res.status(201).send('Usuário cadastrado com sucesso')
    }
    catch(err){
        console.log(err);
    }
  })

const port = 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));