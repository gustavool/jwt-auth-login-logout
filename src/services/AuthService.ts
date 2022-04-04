import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AppError } from '../errors/AppError';

class AuthService {
  async createToken(
    bodyEmail: string,
    bodyPassword: string,
    userPassword: string
  ): Promise<string> {
    const payload = {
      bodyEmail,
      bodyPassword,
    };

    const isValidPassword = await bcrypt.compare(bodyPassword, userPassword);

    if (!isValidPassword) {
      throw new AppError('Invalid password', 401);
    }

    const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
      expiresIn: '15m',
    });

    return token;
  }
}

export default AuthService;
