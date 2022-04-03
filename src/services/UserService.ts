import { User } from '@prisma/client';

import { AppError } from '../errors/AppError';
import prismaClient from '../prisma';

class UserService {
  async create(email: string, password: string): Promise<User> {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError('User already exists', 400);
    }

    const user = await prismaClient.user.create({
      data: {
        email,
        password,
      },
    });

    return user;
  }
}

export default UserService;
