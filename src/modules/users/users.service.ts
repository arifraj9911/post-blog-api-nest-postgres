import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { UserModel } from 'src/models/UsersModel/user.model';
import { UserDto } from './dto/user.dto';
import { Optional } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof UserModel,
  ) {}

  async create(user: UserDto) {
    return await this.userRepository.create(
      user as Optional<UserDto, 'gender'>,
    );
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
}
