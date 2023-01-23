import { Router } from "express"
import { postNewEntryOrExit } from "./controllers/newentryorexit.js";


const newentryorexitRouter = Router()
newentryorexitRouter.post('/newentryorexit', postNewEntryOrExit);

export default newentryorexitRouter;