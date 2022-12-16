import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities';
import { createUserParams, updateUserParams } from 'src/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public createUser(createUserDetails: createUserParams) {
    const newUser = this.userRepository.create({
      ...createUserDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  public fetchUser() {
    return this.userRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  public updateUser(id: number, updateUserDetails: updateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  public findUserById(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  public deleteUser(id: string) {
    return this.userRepository.delete(id);
  }
}
