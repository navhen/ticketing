import express from 'express';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-users';
import { signinRouter } from './routes/signin';
import { singoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(singoutRouter);
app.use(signupRouter)



/* // section 5 setup
app.get('/api/users/currentuser', (req, res) => {
    res.send('Hi There');
});
*/

app.listen(11000, () => {
    console.log('Listen port 11000!');
});