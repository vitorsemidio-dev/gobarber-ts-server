import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const secretMd5 = process.env.MD5_HASH;

    // TODO: Remove
    if (!secretMd5) {
      throw new Error('Secret is missing');
    }

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    const token = sign({}, secretMd5, {
      subject: user.id,
      expiresIn: '1h',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
