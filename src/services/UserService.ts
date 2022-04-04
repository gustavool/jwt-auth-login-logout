import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { AppError } from '../errors/AppError';
import prismaClient from '../prisma';

interface IUserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

class UserService {
  async create(
    name: string,
    email: string,
    password: string
  ): Promise<IUserResponse> {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError('User already exists', 400);
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });

    const userResponse: IUserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return userResponse;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}

export default UserService;
