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

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {
await mongoClient.connect();
} catch (err) {
console.log("Erro no mongo.conect", err.message);
}

db = mongoClient.db();
const talCollection = db.collection("COLLECTIONNNNN");

const loginValidation = Joi.object({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required()
  });

const signUpValidation = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.any().valid(Joi.ref('password')).required()
  });




// ROTAS:

app.post('/login', async (req, res) => {
  const user = req.body
})

app.post('/cadastro', async (req, res) => {
  })

const port = 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));