const express  = require("express");
const schema = require("./types.js")
const todo = require("./db.js");
const mongoose = require("mongoose");
const { parse } = require("dotenv");

mongoose
    .connect("mongodb+srv://admin:Kavi%4045234@cluster0.xcsljz2.mongodb.net/")
    .then(()=>console.log("mongo connected"))
    .catch((err)=>console.log("mongo error",err));  

const app = express();
app.use(express.json);
app.post("/todo",async (req   ,res)=>{
    const createPayload = req.body;
    const parsePayload = schema.createTodo.safeParse(createPayload);

    if(!parsePayload.success){
        res.status(411).json({
            msg:"You have donw something wrong"
        })
       
    }
    const newTodo = await todo.todoSchema.create(parsePayload.data);
    res.status(201).json({
        msg:"todo created successfully",
        data:newTodo
    })


});

app.get("/todos",(req,res)=>{


})
app.put("/completed",(req,res)=>{
    const updatePayload = req.body;
    const parsePayload = schema.createTodo.safeParse(updatePayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg:"you send the wrng inpsdgjgkh"
        })
        return;
    }
    
});

app.listen(3000,console.log("hello"));