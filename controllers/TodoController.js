import TodoModel from '../models/TodoModel.js';

export const processObject = (data) => {
    return {
        id: data._id,
        task: data.task,
        desc: data.desc,
        dueDate: data.dueDate,
        isMarked: data.isMarked,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    }
}
export const getTodos = async (req, res) => {
    try {
        const userId = req.user.id;
        const todos = await TodoModel.find({ user: userId }).sort({ 'createdAt': 'desc' });
        const transformedTodos = todos.map(todo => processObject(todo));

        return res.status(200).json(transformedTodos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

export const addTodo = async (req, res) => {
    try {
        const { task, desc, dueDate } = req.body;
        const userId = req.user.id;
        const data = await TodoModel.create({ task, desc, dueDate, user: userId });
        const processedData = processObject(data);

        return res.status(201).json(processedData);
    } catch (error) {
        console.error(error);
        return res.status(422).json({ error: 'Todo creation failed' });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await TodoModel.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

export const clearCompleted = async ({ res }) => {
    try {
        const data = await TodoModel.deleteMany({ isMarked: true });

        if (data.deletedCount === 0) {
            return res.status(404).json({ error: 'Marked todos not found' });
        }
        return res.status(200).json({ message: 'Successfuly deleted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { task, desc, dueDate, isMarked } = req.body;
        const data = await TodoModel.findByIdAndUpdate(id, { task, desc, dueDate, isMarked }, { new: true });

        if (!data)
            return res.status(404).json({ error: 'Todo not found' });

        const processedData = processObject(data);
        return res.status(200).json(processedData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};