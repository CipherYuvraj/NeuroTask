const mongoose = require("mongoose");
const { string } = require("zod");
mongoose.connect("mongodb://localhost:27017/todoapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
const todoSchema = mongoose.Schema({
    title:String,
    description:String,
    completed:{ 
    type:Boolean,
    default:false
    }
});
const todo = mongoose.model('todos',todoSchema);
module.exports = {
    todo
}