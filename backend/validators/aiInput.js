import {check} from 'express-validator';

export const validateAIInput = [
    check('rawText')
        .notEmpty().withMessage('Prompt is required')
        .isString().withMessage('Prompt must be a string')
        .isLength({ max: 500 }).withMessage('Prompt cannot exceed 500 characters'),
];

