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
    body('email').isEmail(),
    body('password').isLength({ min: 8 })
], bodyValidator);

router.post('/register', register);
router.post('/login', login);

export default router;
