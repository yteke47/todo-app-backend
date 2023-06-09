import { Router } from "express";
import { getTodos, addTodo, deleteTodo, updateTodo, clearCompleted } from "../controllers/TodoController.js";
import authenticateJWT from "../middleware/AuthenticateJWT.js";

const router = Router();

router.get('/getTodos', authenticateJWT, getTodos)
router.post('/addTodo', authenticateJWT, addTodo)
router.delete('/deleteTodo/:id', authenticateJWT, deleteTodo)
router.delete('/clearCompleted', authenticateJWT, clearCompleted)
router.put('/updateTodo/:id', authenticateJWT, updateTodo)

export default router;