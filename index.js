import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import helmet from "helmet";
import todoRouter from './routes/TodoRoutes.js';
import authRouter from './routes/AuthRouter.js';
import { expressJwtMiddleware } from './middleware/authenticateJWT.js';

config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use('/todo', expressJwtMiddleware, todoRouter);
app.use('/auth', authRouter);

app.all('*', ({ res }) => {
    res.status(404).json({ error: 'Not Found' });
});

(async () => {
    try {
        connect(process.env.MONGO_URI || "mongodb://localhost:27017/todoapp");
        console.log("Connected to the database");
        app.listen(port, () => {
            console.log(`Todo app listening on port ${port}`);
        });
    } catch (error) {
        console.error(error);
    }
})();