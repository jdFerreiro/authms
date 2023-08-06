import { Injectable, Inject } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { RoleDto } from '../DTOs/role.dto';
import { ROLE_REPOSITORY } from 'src/core/constants';
import { User } from '@Entities/user.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLE_REPOSITORY) private readonly roleRepository: typeof Role,
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.findAll<Role>({
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
          as: 'users',
        },
      ],
    });
  }

  async findOneById(id: number): Promise<Role> {
    return await this.roleRepository.findOne<Role>({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
          as: 'users',
        },
      ],
    });
  }

  async create(Role: RoleDto, userId: number): Promise<Role> {
    Role.createdBy = userId;
    Role.updatedBy = userId;
    return await this.roleRepository.create<Role>(Role);
  }

  async update(
    id: number,
    Role: RoleDto,
    userId: number,
  ): Promise<{ affectedRows }> {
    Role.updatedBy = userId;

    let numberOfAffectedRows = [];

    await this.roleRepository
      .update({ ...Role }, { where: { id }, returning: true })
      .then(function ([, rows]) {
        numberOfAffectedRows = rows;
      });

    return { affectedRows: numberOfAffectedRows };
  }

  async delete(id: number) {
    const affectedRows = await this.roleRepository.destroy({ where: { id } });

    return { affectedRows };
  }
}
