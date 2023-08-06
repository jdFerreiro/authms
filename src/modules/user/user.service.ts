import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { User } from '@Entities/user.entity';
import { Status } from '@Entities/status.entity';
import { Role } from '@Entities/role.entity';
import { UserDto } from '@Dtos/user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>({
      where: { statusId: { [Op.lt]: 4 } },
      include: [
        {
          model: Status,
          attributes: ['name'],
          as: 'status',
        },
        {
          model: Role,
          attributes: ['id', 'name'],
          as: 'roles',
        },
      ],
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { email },
      include: [
        {
          model: Status,
          attributes: ['name'],
          as: 'status',
        },
        {
          model: Role,
          attributes: ['id', 'name'],
          as: 'roles',
        },
      ],
    });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { id },
      include: [
        {
          model: Status,
          attributes: ['name'],
          as: 'status',
        },
        {
          model: Role,
          attributes: ['id', 'name'],
          as: 'roles',
        },
      ],
    });
  }

  async createUser(user: UserDto, userId: number): Promise<User> {
    user.updatedBy = userId;
    user.createdBy = userId;
    return await this.userRepository.create<User>(user);
  }

  async update(
    id: number,
    user: UserDto,
    userId: number,
  ): Promise<{ affectedRows }> {
    user.updatedBy = userId;

    const result = await this.userRepository.update(
      { ...user },
      { where: { id }, individualHooks: true },
    );

    const numberOfAffectedRows = result[0];
    return { affectedRows: numberOfAffectedRows };
  }

  async delete(id: number, userId: number) {
    const user: User = await this.findOneById(id);

    user.statusId = 4;
    user.statusDate = new Date();
    user.updatedBy = userId;

    const result = await this.userRepository.update(
      { ...user },
      { where: { id }, individualHooks: true },
    );

    const numberOfAffectedRows = result[0];
    return { affectedRows: numberOfAffectedRows };
  }

  async changeStatus(id: number, statusid: number, userId: number) {
    const user: User = await this.findOneById(id);

    user.statusId = statusid;
    user.statusDate = new Date();
    user.updatedBy = userId;

    let numberOfAffectedRows = [];

    await this.userRepository
      .update({ ...user }, { where: { id }, returning: true })
      .then(function ([, rows]) {
        numberOfAffectedRows = rows;
      });

    return { affectedRows: numberOfAffectedRows };
  }
}
