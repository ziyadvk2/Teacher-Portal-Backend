import crypto from 'crypto';
const devKeys  ={
    mongoURI: 'mongodb://localhost:27017/tailwebsDB',
    cookieKey: 'redacted',
    ACCESS_TOKEN_SECRET_KEY : crypto.randomBytes(32).toString('hex'),
    REFRESH_TOKEN_SECRET_KEY : crypto.randomBytes(32).toString('hex')
    };
export default devKeys ;