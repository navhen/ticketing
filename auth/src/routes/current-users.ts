import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    res.send('Router Current Users');

});

export { router as currentUserRouter };