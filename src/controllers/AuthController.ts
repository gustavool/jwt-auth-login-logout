import { Request, Response } from 'express';

import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

interface IBody {
  email: string;
  password: string;
}

class AuthController {
  async auth(request: Request, response: Response): Promise<Response> {
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
}

export default AuthController;
