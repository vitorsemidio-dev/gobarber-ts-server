import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
}

injectable();
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    if (user.email !== email) {
      const checkEmail = await this.usersRepository.findByEmail(email);

      if (checkEmail && checkEmail.id !== user.id) {
        throw new AppError('Email is already used by other user');
      }
    }

    if (password && password !== old_password) {
      throw new AppError('Password does not match');
    }

    const passwordHashed = password
      ? await this.hashProvider.generateHash(password)
      : user.password;

    Object.assign(user, {
      name,
      email,
      password: passwordHashed,
    });

    await this.usersRepository.save(user);

    return user;
  }
}
