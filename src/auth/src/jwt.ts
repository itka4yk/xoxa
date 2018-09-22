import expressJwt from 'express-jwt';
const config = require('./config.json');
import usersRepository from './UsersRepository';

export default function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register'
        ]
    });
}

async function isRevoked(_, payload, done) {
    const user = await usersRepository.getById(payload.sub);

    if (!user) {
        return done(null, true);
    }

    done();
};