import { Router } from "express"
import { postSignUp } from "./controllers/signup.js";


const signupRouter = Router()
signupRouter.post('/signup', postSignUp);

export default signupRouter;