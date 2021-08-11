const expressJwt = require('express-jwt');

function jwt() {
    const secret = process.env.secret;
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/'
        ]
    });
}

module.exports = jwt;