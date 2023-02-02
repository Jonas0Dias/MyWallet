import { db } from "../config/database.js"
import { ObjectId } from "mongodb"

export async function deleteItem(req,res)
{
    await db.collection("EntryOrExit").deleteOne({_id: ObjectId(req.params.id)})
    res.sendStatus(200)
}
