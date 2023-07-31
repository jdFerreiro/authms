import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { User } from 'src/modules/users/user.entity';
import { UserDto } from 'src/modules/users/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
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
}
