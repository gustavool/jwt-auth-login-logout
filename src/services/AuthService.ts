import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import blacklist from '../redis/blacklist';

class AuthService {
  async createToken(
    bodyEmail: string,
    bodyPassword: string,
    userPassword: string
  ): Promise<string> {
    const payload = {
      email: bodyEmail,
      password: bodyPassword,
    };

    const isValidPassword = await bcrypt.compare(bodyPassword, userPassword);

    if (!isValidPassword) {
      throw new AppError('Password or email is invalid', 401);
    }

    const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
      expiresIn: '15m',
    });

    return token;
  }

  async verifyTokenInBlackList(token: string): Promise<void> {
    const isTokenInBlackList = await blacklist.isTokenListed(token);

    if (isTokenInBlackList) {
      throw new AppError('Token is not valid', 401);
    }
  }
}

export default AuthService;
