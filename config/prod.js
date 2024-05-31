import crypto from 'crypto';

const prodKeys = {
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY || crypto.randomBytes(32).toString('hex'),
    REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY || crypto.randomBytes(32).toString('hex')
};

export default prodKeys;