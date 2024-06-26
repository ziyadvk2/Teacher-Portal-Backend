import jwt from 'jsonwebtoken';
import keys from '../config/keys.js';

export function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    keys.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: '1d' }
  );
}

export function generateRefreshToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    keys.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: '1d' }
  );
}

export function verifyRefreshToken(token) {
  try {
    const decoded = jwt.verify(token, keys.REFRESH_TOKEN_SECRET_KEY);
    return decoded;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
}

