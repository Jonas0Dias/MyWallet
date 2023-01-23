import { Router } from "express"
import { getHome } from "./controllers/home.js";


const homeRouter = Router()
homeRouter.get('/home', getHome);

export default homeRouter;