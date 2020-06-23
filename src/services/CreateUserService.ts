import { getRepository } from 'typeorm';

import User from '../models/User';

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
      throw new Error('Email address already used');
    }

    const user = usersRepository.create({
      email,
      name,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
