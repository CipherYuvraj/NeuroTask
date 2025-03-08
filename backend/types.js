const zod = require("zod");

const createTodo = zod.object({
    title: zod.string().min(4),
    description: zod.string().min(12),
});

const updateTodo = zod.object({
    id: zod.string(),
    completed: zod.boolean()
});

module.exports = { createTodo, updateTodo };
