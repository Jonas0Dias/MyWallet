import { Router } from "express"
import {updateItem} from "../controllers/update.js" 

const updateRouter = Router()
updateRouter.put('/:id', updateItem);

export default updateRouter;
