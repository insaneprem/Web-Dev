import express from "express";
import { createClient } from "redis";

const app= express()
app.use(express.json())


const client = createClient()
client.connect()

app.post('/submit',async(req,res)=>{
    const {problemId,userId,code , languge} = req.body

    //push this to db prisma.submission.create()

    await client.lPush('submission',JSON.stringify({problemId,userId,code , languge}))
    res.json({
        message : "submission recive"
    })
})


app.listen(3000,()=>{
    console.log(`App is Listening on port 3000`)
})