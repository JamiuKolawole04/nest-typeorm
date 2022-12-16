import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities';
import { createUserParams } from 'src/utils';

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

  fetchUser() {}
}
