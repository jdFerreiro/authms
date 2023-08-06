import { Injectable, Inject } from '@nestjs/common';
import { User } from '@Entities/user.entity';
import { UserDto } from '@Dtos/user.dto';
import { USER_REPOSITORY } from 'src/core/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    user.updatedBy = 1;
    user.createdBy = 1;
    return await this.userRepository.create<User>(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async changePassword(id: number, newPassword: string) {
    const result = await this.userRepository.update(
      { password: newPassword },
      { where: { id } },
    );

    const numberOfAffectedRows = result[0];
    const updatedUser = result;
    return { numRec: numberOfAffectedRows, User: updatedUser };
  }
}
