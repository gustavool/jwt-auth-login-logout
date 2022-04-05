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

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const service = new UserService();

    const user = await service.findById(id);

    return response.json({
      user,
    });
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    const service = new UserService();

    const users = await service.findAll();

    return response.json({
      users,
    });
  }
}

export default UserController;
