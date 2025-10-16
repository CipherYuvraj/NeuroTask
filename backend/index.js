const express  = require("express");

const app = express();
app.use(express.json);
app.post("/todo",()=>{
    res.send("hello");
});

app.get("/todos",(req,res)=>{

    

})
app.put("/completed",(req,res)=>{
  
});

app.listen(3000,console.log("hello"));