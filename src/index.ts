import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute";
import { initializeDatabase } from './models/userModules';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/users', userRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

initializeDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });