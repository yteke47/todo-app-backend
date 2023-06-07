import { Router } from "express";
import { getTodos, addTodo, deleteTodo, updateTodo } from "../controllers/TodoController.js";

const router = Router();

router.get('/getTodos', getTodos)
router.post('/addTodo', addTodo)
router.delete('/deleteTodo/:id', deleteTodo)
router.put('/updateTodo/:id', updateTodo)

export default router;