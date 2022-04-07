import { Request, Response } from 'express';

import { AppError } from '../errors/AppError';
import blacklist from '../redis/blacklist';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

interface IBody {
  email: string;
  password: string;
}

class AuthController {
  async login(request: Request, response: Response): Promise<Response> {
    const body = request.body as IBody;

    const userService = new UserService();
    const authService = new AuthService();

    const user = await userService.findByEmail(body.email);

    const token = await authService.createToken(
      body.email,
      body.password,
      user.password
    );

    const userResponse = {
      id: user.id,
      email: user.email,
    };

    return response.json({ user: userResponse, token });
  }

  async logout(request: Request, response: Response): Promise<Response> {
    try {
      const { token } = request;

      await blacklist.addToken(token);
      return response.status(204).send();
    } catch {
      throw new AppError('Error to logout', 500);
    }
  }
}

export default AuthController;
