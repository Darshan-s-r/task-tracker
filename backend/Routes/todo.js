import express from 'express';
const router = express.Router();

import { formInputValidator } from '../validators/formInput.js';
import { handleValidationErrors } from '../validators/index.js';
import { addTodo, getTodos, updateTodo, deleteTodo,getFilteredTodos, getByTitle } from '../controllers/todo.js';

router.get('/todos', getTodos);
router.get('/todo', getFilteredTodos);
router.get('/todosByTitle', getByTitle);
router.put('/addtodo', formInputValidator, handleValidationErrors, addTodo);
router.patch('/todo/:id', formInputValidator, handleValidationErrors, updateTodo);
router.delete('/todo/:id', deleteTodo);

export default router;