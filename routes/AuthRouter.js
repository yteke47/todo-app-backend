import { Router } from "express";
import { body, validationResult } from "express-validator";
import { register, login } from "../controllers/AuthController.js";

const router = Router();

const bodyValidator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.use([
    body('email').notEmpty().isEmail(),
    body('password').notEmpty(),
], bodyValidator);

router.post('/register', register);
router.post('/login', login);

export default router;
