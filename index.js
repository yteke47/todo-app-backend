import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import todoRouter from './routes/TodoRoutes.js';
import authRouter from './routes/AuthRouter.js';

config();

const app = express();
const port = process.env.PORT || 4523;

app.use(express.json());
app.use(cors());
app.use(todoRouter);
app.use(authRouter);


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