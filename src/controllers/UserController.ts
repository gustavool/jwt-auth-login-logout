import { Request, Response } from 'express';

import UserService from '../services/UserService';

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const service = new UserService();

    const user = await service.create(name, email, password);

    return response.json({
      user,
    });
  }
}

export default UserController;
