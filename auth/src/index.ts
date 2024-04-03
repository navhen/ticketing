import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res) => {
    res.send('Hi There');
});

app.listen(11000, () => {
    console.log('Listen port 11000!');
});