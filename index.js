import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import helmet from "helmet";
import todoRouter from './routes/TodoRoutes.js';
import authRouter from './routes/AuthRouter.js';

config();

const app = express();
const port = process.env.PORT || 4523;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(todoRouter);
app.use(authRouter);

app.all('*', (req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});


(async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log("Connected to the database");
        app.listen(port, () => {
            console.log(`Todo app listening on port ${port}`);
        });
    } catch (error) {
        console.error(error);
    }
})();