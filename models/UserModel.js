import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import crypto from 'crypto';
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: [true, "Email can't be blank"],
        match: [/\S+@\S+\.\S+/, 'Invalid email format'],
        index: true
    },
    hash: {
        type: String
    },
    salt: {
        type: String
    }
}, {
    collection: 'Users',
    versionKey: false,
    timestamps: true,
});

userSchema.plugin(uniqueValidator)

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function (password) {
    const hashedPassword = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(this.hash, 'hex'), Buffer.from(hashedPassword, 'hex'));
};

userSchema.methods.generateJWT = function () {
    const expiresIn = '1h';

    return jwt.sign({
        id: this._id,
        email: this.email,
    }, process.env.SECRET, { expiresIn });
};

userSchema.methods.toAuthJSON = function () {
    return {
        email: this.email,
        token: this.generateJWT(),
    };
};


export default model("Users", userSchema)