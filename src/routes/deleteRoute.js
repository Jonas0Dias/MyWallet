import { Router } from "express"
import {deleteItem} from "../controllers/delete.js" 

const deleteRouter = Router()
deleteRouter.delete('/:id', deleteItem);

export default deleteRouter;