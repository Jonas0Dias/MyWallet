import { db } from "../config/database.js"
import { ObjectId } from "mongodb"

export async function deleteItem(req,res)
{
    await db.collection("EntryOrExit").deleteOne({_id: ObjectId(req.params.id)})
    const expensesList = await db.collection("EntryOrExit").find({userID: req.headers.id}).toArray()
    res.status(200).send(expensesList)
}
