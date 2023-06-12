import { Router } from "express";
import { body, validationResult } from "express-validator";
import { register, login } from "../controllers/AuthController.js";

const router = Router();

const bodyValidator = [
    body('email').notEmpty().isEmail().withMessage('Email is required and must be valid'),
    body('password').notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

router.post('/register', bodyValidator, register);
router.post('/login', bodyValidator, login);

export default router;
