import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

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

    const passwordHash = bcrypt.hashSync(password, 8);

    const user = await prismaClient.user.create({
      data: {
        email,
        password: passwordHash,
      },
    });

    return user;
  }
}

export default UserService;
