import TodoModel from '../models/TodoModel.js';

const processObject = (data) => {
    return {
        id: data._id,
        task: data.task,
        isMarked: data.isMarked,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    }
}

const processArray = (array) => {
    const transformedTodos = array.map(data => ({
        id: data._id,
        task: data.task,
        isMarked: data.isMarked,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    }));
    return transformedTodos;
}

const getTodos = async (req, res) => {
    const userId = req.user.id;
    try {
        const todos = await TodoModel.find({ user: userId }).sort({ 'createdAt': 'desc' });
        const transformedTodos = processArray(todos);

        res.status(200).json(transformedTodos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const addTodo = async (req, res) => {
    const { task } = req.body;
    const userId = req.user.id;
    try {
        const data = await TodoModel.create({ task, user: userId });
        const processedData = processObject(data);

        console.log("Todo added successfully...");
        res.status(201).json(processedData);
    } catch (error) {
        console.error(error);
        res.status(422).json({ error: 'Todo creation failed' });
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await TodoModel.findByIdAndDelete(id);
        const processedData = processObject(data);

        if (data) {
            console.log("Todo deleted successfully...");
            res.status(200).json(processedData);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const clearCompleted = async ({ res }) => {
    try {
        const data = await TodoModel.deleteMany({ isMarked: true });

        if (data.deletedCount > 0) {
            console.log("Completed todos deleted successfully...");
            res.status(200).json({ message: 'Successfuly deleted' });
        } else {
            res.status(404).json({ error: 'Marked todos not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { task, isMarked } = req.body;
    try {
        const data = await TodoModel.findByIdAndUpdate(id, { task, isMarked }, { new: true });
        const processedData = processObject(data);

        if (data) {
            console.log("Todo updated successfully...");
            res.status(200).json(processedData);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export { getTodos, addTodo, deleteTodo, updateTodo, clearCompleted };