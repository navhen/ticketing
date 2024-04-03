import express from 'express';

const router = express.Router();

router.get('/api/users/signup', (req, res) => {
    res.send('Router signup');

});

export { router as signupRouter };