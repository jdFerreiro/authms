import { Injectable, Inject } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserDto } from '../DTOs/user.dto';
import { USER_REPOSITORY } from 'src/core/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async changePassword(id: number, newPassword: string) {
    const [numberOfAffectedRows, [updatedUser]] =
      await this.userRepository.update(
        { password: newPassword },
        { where: { id }, returning: true },
      );

    return { numRec: numberOfAffectedRows, User: updatedUser };
  }
}
