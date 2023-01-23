import express from "express";
import cors from "cors";
import { v4 as uuidV4 } from 'uuid';
import { postLogin } from "./controllers/login.js";
import { postSignUp } from "./controllers/signup.js";
import { postNewEntryOrExit } from "./controllers/newentryorexit.js";
import { getHome } from "./controllers/home.js";


const app = express();
app.use(cors());
app.use(express.json());



// ROTAS:
app.post('/login', postLogin) ;
app.post('/signup', postSignUp);
app.get('/home', getHome);
app.post('/newentryorexit', postNewEntryOrExit);





app.listen(process.env.PORT , () => console.log(`Server running in port: ${process.env.PORT}`));