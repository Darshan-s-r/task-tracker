import {check} from 'express-validator';

export const formInputValidator = [
    check('title')
        .notEmpty().withMessage('title field is required')
        .isString().withMessage('title field must be a string')
        .isLength({ max: 255 }).withMessage('title field cannot exceed 255 characters'),
    check('dueDate')
        .notEmpty().withMessage('dueDate field is required')
        .isISO8601().withMessage('dueDate field must be a valid date'),
    check('priority')
        .notEmpty().withMessage('priority field is required')  
        .isIn(['low', 'medium', 'high']).withMessage('priority field must be one of the following values: low, medium, high'),
    check('status')
        .notEmpty().withMessage('status field is required')
        .isIn(['todo', 'in-progress', 'completed']).withMessage('status field must be one of the following values: todo, in-progress, completed'),
];