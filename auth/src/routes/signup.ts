import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be between 4 and 20 character')
    ], 
    async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        // this is javascript land (not ts)
        throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existinguser = await User.findOne({ email });

    if (existinguser) {
        throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password});
    await user.save();

    res.status(201).send(user);

    // 
    //const { email, password } = req.body;

});

export { router as signupRouter };