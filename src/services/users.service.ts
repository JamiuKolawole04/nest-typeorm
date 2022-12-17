import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, Profile } from 'src/entities';
import {
  createUserParams,
  updateUserParams,
  CreateUserProfileParams,
} from 'src/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
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
      relations: ['profile'],
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

  public async createUserProfile(
    createProfileDetails: CreateUserProfileParams,
    id: number,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'user not found. cannot create profile',
        HttpStatus.BAD_REQUEST,
      );
    const newProfile = this.profileRepository.create(createProfileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);

    user.profile = savedProfile;
    return this.userRepository.save(user);
  }
}
