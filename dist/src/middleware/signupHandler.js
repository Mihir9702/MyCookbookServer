"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("../models/User.model"));
const signupHandler = (req, res, next) => {
    const { name, username, password } = req.body;
    const special = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    User_model_1.default.findOne({ username: req.body.username })
        .then(user => {
        if (user) {
            res.status(400).send({ message: 'Account has already been created' });
            return;
        }
    })
        .catch(e => res.status(500).json({ message: `Internal Server Error: ${e}` }));
    if (special.test(name)) {
        res.status(400).json({ message: 'Name cannot contain special characers' });
        return;
    }
    else if (special.test(username)) {
        res.status(400).json({ message: 'Username cannot contain special characers' });
        return;
    }
    if (username.length < 3) {
        res.status(400).json({ message: 'Username must contain at least 3 characters' });
        return;
    }
    if (password.length < 8) {
        res.status(400).json({ message: 'Password must contain at least 8 characters' });
        return;
    }
    next();
};
exports.default = signupHandler;
