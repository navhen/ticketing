import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';


import { currentUserRouter } from './routes/current-users';
import { signinRouter } from './routes/signin';
import { singoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(singoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});
app.use(errorHandler);


/* // section 5 setup
app.get('/api/users/currentuser', (req, res) => {
    res.send('Hi There');
});
*/

const startUP = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to mongdb');
    } catch (err) {
        console.log(err);
    }

    app.listen(11000, () => {
        console.log('Listen port 11000!');
    });
};

startUP();

