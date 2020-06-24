import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';

import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface Request {
  avatarFilename: string;
  user_id: string;
}

class UpdateUserAvatarService {
  public async execute({ avatarFilename, user_id }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.tmpFolder, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
