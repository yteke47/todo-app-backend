import { Router } from "express";
import { body, validationResult } from "express-validator";
import { register, login } from "../controllers/AuthController.js";

const router = Router();

const validateEmail = body('email').notEmpty().isEmail().withMessage('Email is required and must be valid');
const validatePassword = body('password').notEmpty().withMessage('Password is required');

const validationMiddleware = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    return next();
};

const bodyValidator = [validateEmail, validatePassword, validationMiddleware];

router.post('/register', bodyValidator, register);
router.post('/login', bodyValidator, login);

export default router;
