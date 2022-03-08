"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenFromHeaders = (req) => {
    // Check if the token is available on the request Headers
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        // Get the encoded token string and return it
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};
exports.default = tokenFromHeaders;
