import { db } from "../config/database.js"

export async function getHome(req,res)
{
    console.log(typeof( req.headers.id))
    const expensesList = await db.collection("EntryOrExit").find({userID: req.headers.id}).toArray()
    res.send(expensesList)
}
