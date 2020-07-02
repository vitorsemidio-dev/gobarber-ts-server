import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  public async findById(id: string): Promise<User | undefined> {
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    return user;
  }

  public async save(user: User): Promise<User> {}
}

export default UsersRepository;
