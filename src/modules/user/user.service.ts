import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { User } from 'src/modules/users/user.entity';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll<User>({
      where: { statusId: { [Op.lt]: 4 } },
    });
  }

  async createUser(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async update(id: number, user: UserDto): Promise<{ number; User }> {
    const [numberOfAffectedRows, [updatedUser]] =
      await this.userRepository.update(
        { ...user },
        { where: { id }, returning: true },
      );
    return { number: numberOfAffectedRows, User: updatedUser };
  }

  async delete(id: number) {
    const [numberOfAffectedRows, [updatedUser]] =
      await this.userRepository.update(
        { statusId: 4, statusDate: new Date() },
        { where: { id }, returning: true },
      );

    return { number: numberOfAffectedRows, User: updatedUser };
  }

  async changeStatus(id: number, statusid: number) {
    const [numberOfAffectedRows, [updatedUser]] =
      await this.userRepository.update(
        { statusId: statusid, statusDate: new Date() },
        { where: { id }, returning: true },
      );

    return { number: numberOfAffectedRows, User: updatedUser };
  }
}
