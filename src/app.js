import express from "express";
import cors from "cors";
import { v4 as uuidV4 } from 'uuid';
import homeRouter from "./routes/homeRoute.js"
import loginRouter from "./routes/loginRoute.js"
import newentryorexitRouter from "./routes/newentryorexitRoute.js"
import signupRouter from "./routes/signupRoute.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use([homeRouter, loginRouter, newentryorexitRouter, signupRouter])


app.listen(process.env.PORT , () => console.log(`Server running in port: ${process.env.PORT}`));