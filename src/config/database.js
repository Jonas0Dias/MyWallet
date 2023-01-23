import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";


dotenv.config();
const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
await mongoClient.connect();
} catch (err) {
console.log("Erro no mongo.conect", err.message);
}
export const db = mongoClient.db();
const users = db.collection("users"); //cria a coleção users