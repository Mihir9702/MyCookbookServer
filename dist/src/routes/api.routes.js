"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// import auth from '../middleware/jwt.middleware'
/*******************************************
            cookbook.com/api
*******************************************/
// Api Routes are handled here
const category_routes_1 = __importDefault(require("./category.routes"));
router.use('/', category_routes_1.default);
const user_routes_1 = __importDefault(require("./user.routes"));
router.use('/user', user_routes_1.default);
const cookbook_routes_1 = __importDefault(require("./cookbook.routes"));
router.use('/cookbook', cookbook_routes_1.default);
exports.default = router;
