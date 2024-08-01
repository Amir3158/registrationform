import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/users', userRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});