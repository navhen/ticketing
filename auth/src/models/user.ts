import mongoose from "mongoose";
import { Password } from "../services/password";

// an interface tha describe the properties
// that are required to create a new user

interface UserAttrs {
    email: string;
    password: string;
}

// An interface then describes the properties
// that a User Model has

interface UserModel extends mongoose.Model<UserDoc> {
    build(atrs: UserAttrs): UserDoc;
}

// An interface that describe the properties
// that a User Document has

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

/*
// test File
User.build({
    email: 'test@test.com',
    password: 'password'
})
*/
export { User };