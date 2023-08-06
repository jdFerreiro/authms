import { Injectable, Inject } from '@nestjs/common';
import { MenuRole } from '@Entities/MenuRole.entity';
import { MenuRoleDto } from '@Dtos/MenuRole.dto';
import { MENUROLE_REPOSITORY } from 'src/core/constants';
import { Role } from '@Entities/role.entity';
import { Menu } from '@Entities/menu.entity';
import { Op } from 'sequelize';

@Injectable()
export class MenuRoleService {
  constructor(
    @Inject(MENUROLE_REPOSITORY)
    private readonly MenuRoleRepository: typeof MenuRole,
  ) {}

  async findAll(): Promise<MenuRole[]> {
    return await this.MenuRoleRepository.findAll<MenuRole>({
      include: [
        {
          model: Menu,
          attributes: ['id', 'name'],
          as: 'menus',
        },
        {
          model: Role,
          attributes: ['id', 'name'],
          as: 'roles',
        },
      ],
    });
  }

  async findOneById(id: number): Promise<MenuRole> {
    return await this.MenuRoleRepository.findOne<MenuRole>({
      where: { id },
      include: [
        {
          model: Menu,
          attributes: ['id', 'name'],
          as: 'menus',
        },
        {
          model: Role,
          attributes: ['id', 'name'],
          as: 'roles',
        },
      ],
    });
  }

  async create(MenuRole: MenuRoleDto, userId: number): Promise<MenuRole> {
    MenuRole.createdBy = userId;
    MenuRole.updatedBy = userId;
    return await this.MenuRoleRepository.create<MenuRole>(MenuRole);
  }

  async delete(roleId: number, menuId: number) {
    const affectedRows = await this.MenuRoleRepository.destroy({
      where: { roleId, menuId },
    });

    return { affectedRows };
  }
}
