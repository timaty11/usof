import Express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';

// Routers
import authRouter from './routes/auth-router.js';
import userRouter from './routes/user-router.js';
import postRouter from './routes/post-router.js';
import categoriesRouter from './routes/categories-router.js';
import commentsRouter from './routes/comments-router.js';

import client from './db.js';
await client.connect();

dotenv.config();

const app = Express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/comments', commentsRouter);


app.listen(PORT, () => {
    console.log("Server started at " + PORT);
});
