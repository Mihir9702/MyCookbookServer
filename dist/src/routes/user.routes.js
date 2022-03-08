"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = require("express");
const router = (0, express_1.Router)();
// Models
const User_model_1 = __importDefault(require("../models/User.model"));
const jwt_middleware_1 = __importDefault(require("../middleware/jwt.middleware"));
// Encryption
const bcryptjs_1 = require("bcryptjs");
// JWT
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/***********************************************
             cookbook.com/api/user
 ***********************************************/
// * Signup POST
router.post('/signup', (req, res) => {
    const SALTROUNDS = 10;
    const salt = (0, bcryptjs_1.genSaltSync)(SALTROUNDS);
    const hash = (0, bcryptjs_1.hashSync)(req.body.password, salt);
    req.body.password = hash;
    User_model_1.default.create(req.body)
        .then(u => res.json(u))
        .catch(() => res.status(400).json({ errorMessage: 'User Creation Error' }));
});
// * Login POST
router.post('/login', (req, res) => {
    User_model_1.default.findOne({ username: req.body.username })
        .then(user => {
        // Couldn't find an account
        if (!user)
            return res.status(401).json({ errorMessage: 'Account not found' });
        // Comparing passwords
        const checkPass = (0, bcryptjs_1.compareSync)(req.body.password, user.password);
        if (checkPass) {
            const { _id, name, username } = user;
            // Token payload
            const payload = { _id, name, username };
            console.log(process.env.TOKEN_SECRET);
            // Create and sign the token
            const authToken = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
                algorithm: 'HS256',
                expiresIn: '6h',
            });
            res.status(201).json(Object.assign(Object.assign({}, payload), { authToken: authToken }));
        }
        else {
            res
                .status(401)
                .json({ errorMessage: 'Username or Password is incorrect' });
        }
    })
        .catch(() => res.status(504).json({ errorMessage: 'Internal Server Error' }));
});
//  TODO | NOW: Testing JWT - Success | LATER: Setup middleware for routes
router.get('/jwt', jwt_middleware_1.default, (req, res) => {
    res.status(200).json({ status: 'You are authenticated' });
});
router.get('/:id/delete', (req, res) => {
    User_model_1.default.findByIdAndRemove(req.params.id)
        .then(deletedUser => res
        .status(200)
        .json({ status: `Successfully deleted ${deletedUser.username}` }))
        .catch(() => res.status(500).json({ errorMessage: 'Unable to delete account' }));
});
/*************************************************
                   Dynamic Routes
 *************************************************/
// * Individual User
router.get('/:user', (req, res) => {
    User_model_1.default.findOne({ username: req.params.user })
        .then(u => res.json(u))
        .catch(() => res.status(503).json({ errorMessage: 'Unable to find user' }));
});
// * Update said user
router.get('/:user/update', (req, res) => {
    User_model_1.default.findOneAndUpdate({ username: req.params.user }, req.body)
        .then(u => res.json(u))
        .catch(() => res.status(503).json({ errorMessage: 'Unable to update user' }));
});
exports.default = router;
