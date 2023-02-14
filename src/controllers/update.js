import { db } from "../config/database.js"
import { ObjectId } from "mongodb"

export async function updateItem(req,res)
{
    try{
        await db.collection("EntryOrExit").updateOne({_id: ObjectId(req.params.id)}, {
            $set: {
                value: req.body.value, 
                description: req.body.description
            }
                    } 
                                                     )
        res.status(200).send('Documento atualizado com sucesso')
    }catch(err){
        return('err')
    }

   
}
