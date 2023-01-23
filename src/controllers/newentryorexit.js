import { newEntryOrExit } from "../schemas/newEntryOrExit.js";
import { db } from "../config/database.js"
import dayjs from "dayjs";


export async function postNewEntryOrExit(req,res)
{
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
