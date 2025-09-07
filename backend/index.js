const express = require("express");
const { createTodo, updateTodo } = require("./types.js");
const { todo } = require("./db.js");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));




app.post("/todo", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        return res.status(411).json({ msg: "You sent the wrong inputs" });
    }

    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    });

    res.json({ msg: "Todo created" });
});

app.get("/todos", async function(req, res) {
    const todos = await todo.find({});
    res.json({ todos });  // ✅ Correctly returning the fetched todos
});

app.put("/completed", async function(req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if (!parsedPayload.success) {
        return res.status(411).json({ msg: "You sent the wrong inputs" });
    }

    await todo.updateOne({ _id: req.body.id }, { completed: true });

    res.json({ msg: "Todo marked as completed" });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
