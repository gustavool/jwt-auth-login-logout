import prismaClient from '../prisma';

class UserService {
  async create(email: string, password: string) {
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
