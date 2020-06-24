import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface Request {
  email: string;
  name: string;
  password: string;
}

class CreateUserService {
  public async execute({ email, name, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
