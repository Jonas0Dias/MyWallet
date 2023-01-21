import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import Joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from 'uuid';
import dayjs from "dayjs";

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

const newEntryOrExit = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().required(),
    type: Joi.string().valid("exit", "entry").required()
  });




// ROTAS:

app.post('/login', async (req, res) => {
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
})

app.post('/signup', async (req, res) => {
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
  })

app.get('/home',async(req,res) => {
    console.log(typeof( req.headers.id))
    const expensesList = await db.collection("EntryOrExit").find({userID: req.headers.id}).toArray()
    console.log(expensesList)
    res.send(expensesList)
})

app.post('/newentryorexit',async(req,res) => {
    const user = req.headers.id
    const entryorexit = req.body; //espero q o expenses seja um objeto com valor, descrição e o usuário 
    const date = dayjs().format("DD/MM");
    const validate = newEntryOrExit.validate(entryorexit, { abortEarly: true });
    try{
        if (validate.error) {
            res.status(422).send(validate.error);
            return;
        }
        await db.collection('EntryOrExit').insertOne({value: entryorexit.value, description: entryorexit.description, date: date, userID: user, type: entryorexit.type});
        res.status(201).send('Entrada cadastrada com sucesso!')
        }
    catch(err){
        res.send(err)
    }
}
) 




const port = 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));