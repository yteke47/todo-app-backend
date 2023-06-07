import TodoModel from '../models/TodoModel.js';

const getTodos = async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const addTodo = async (req, res) => {
    const todo = req.body;
    try {
        const data = await TodoModel.create(todo);
        console.log("Todo added successfully...");
        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        res.status(422).json({ error: 'Todo creation failed' });
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await TodoModel.findByIdAndDelete(id);
        if (data) {
            console.log("Todo deleted successfully...");
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const todo = req.body;
    try {
        const data = await TodoModel.findByIdAndUpdate(id, todo, { new: true });
        if (data) {
            console.log("Todo updated successfully...");
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export { getTodos, addTodo, deleteTodo, updateTodo };