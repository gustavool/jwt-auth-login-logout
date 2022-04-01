import { Request, Response } from 'express';

import UserService from '../services/UserService';

class UserController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const service = new UserService();

    const user = await service.create(email, password);

    return response.json(user);
  }
}

export default UserController;
