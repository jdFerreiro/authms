import { Injectable, Inject } from '@nestjs/common';
import { UserRole } from '@Entities/UserRole.entity';
import { UserRoleDto } from '@Dtos/UserRole.dto';
import { USERROLE_REPOSITORY } from 'src/core/constants';
import { User } from '@Entities/user.entity';
import { Role } from '@Entities/role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @Inject(USERROLE_REPOSITORY)
    private readonly UserRoleRepository: typeof UserRole,
  ) {}

  async findAll(): Promise<UserRole[]> {
    return await this.UserRoleRepository.findAll<UserRole>({
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
          as: 'users',
        },
        {
          model: Role,
          attributes: ['id', 'name'],
          as: 'roles',
        },
      ],
    });
  }

  async findOneById(id: number): Promise<UserRole> {
    return await this.UserRoleRepository.findOne<UserRole>({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
          as: 'users',
        },
        {
          model: Role,
          attributes: ['id', 'name'],
          as: 'roles',
        },
      ],
    });
  }

  async create(UserRole: UserRoleDto, userId: number): Promise<UserRole> {
    UserRole.createdBy = userId;
    UserRole.updatedBy = userId;
    return await this.UserRoleRepository.create<UserRole>(UserRole);
  }

  async delete(userId: number, roleId: number) {
    const affectedRows = await this.UserRoleRepository.destroy({
      where: { userId, roleId },
    });

    return { affectedRows };
  }
}
