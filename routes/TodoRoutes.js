import { Router } from "express";
import { getTodos, addTodo, deleteTodo, updateTodo, clearCompleted } from "../controllers/TodoController.js";

const router = Router();

const validateIdParam = (req, res, next) => {
    const { id } = req.params;
    const regex = /^[a-fA-F0-9]{24}$/;

    if (id && !regex.test(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    return next();
};

router.get('/getTodos', getTodos);
router.post('/addTodo', addTodo);
router.delete('/deleteTodo/:id', validateIdParam, deleteTodo);
router.delete('/clearCompleted', clearCompleted);
router.put('/updateTodo/:id', validateIdParam, updateTodo);

export default router;