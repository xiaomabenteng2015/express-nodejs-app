const express = require("express");

// 创建一个 Express 应用程序
const app = express();

// process.env 是 Node.js 中的一个全局对象，它包含了系统环境变量。
// 环境变量是在操作系统层面设置的键值对，可以在不修改代码的情况下改变程序的行为
const port = process.env.PORT || 8008;
const host = process.env.HOST || 'localhost';

// 启动服务器
app.listen(port, host, () => {
    console.log(`Test app listening at http://localhost:${port}`)
})
const todos = [
    {
        title: "Todo 1",
        desc: "This is my first Todo",
        completed: true,
    },
    {
        title: "Todo 2",
        desc: "This is my second Todo",
        completed: true,
    },
    {
        title: "Todo 3",
        desc: "This is my third Todo",
        completed: true,
    },
    {
        title: "Todo 4",
        desc: "This is my fourth Todo",
        completed: true,
    },
    {
        title: "Todo 5",
        desc: "This is my fifth Todo",
        completed: true,
    },
];

// 检索存储在我们服务器中的所有 Todos
app.get("/todos", (request, response) => {
    response.status(200).json(todos);
});

// 检索具有给定 ID 的 Todo
app.get("/todos/:id", (request, response) => {
    response
        .status(200)
        .json({ data: todos.find((todo) => todo.id === request.params.id) });
});

// 创建一个新 Todo
app.post("/todos", (request, response) => {
    todos.push(request.body);
    response.status(201).json({ msg: "Todo created successfully" });
});

// 更新具有给定 ID 的 Todo
app.put("/todos/:id", (request, response) => {
    const todo = todos.find((todo) => todo.id === request.params.id);
    if (todo) {
        const { title, desc, completed } = request.body;
        todo.title = title;
        todo.desc = desc;
        todo.completed = completed;
        response.status(200).json({ msg: "Todo updated successfully" });
        return;
    }
    response.status(404).json({ msg: "Todo not found" });
});

// 删除具有给定 ID 的 Todo
app.delete("/todos/:id", (request, response) => {
    const todoIndex = todos.findIndex((todo) => (todo.id = request.params.id));
    if (todoIndex) {
        todos.splice(todoIndex, 1);
        response.status(200).json({ msg: "Todo deleted successfully" });
    }
    response.status(404).json({ msg: "Todo not found" });
});