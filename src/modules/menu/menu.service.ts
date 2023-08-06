import { Injectable, Inject } from '@nestjs/common';
import { Menu } from '@Entities/menu.entity';
import { MenuDto } from '@Dtos/menu.dto';
import { MENU_REPOSITORY } from 'src/core/constants';
import { Role } from '@Entities/role.entity';

@Injectable()
export class MenuService {
  constructor(
    @Inject(MENU_REPOSITORY) private readonly menuRepository: typeof Menu,
  ) {}

  async findAll(): Promise<Menu[]> {
    return await this.menuRepository.findAll<Menu>({
      where: { parentId: null },
      include: [
        {
          model: Menu,
          attributes: ['id', 'name'],
          as: 'parent',
        },
        {
          model: Menu,
          attributes: ['id', 'name'],
          include: [
            {
              model: Menu,
              attributes: ['id', 'name'],
              as: 'children',
            },
          ],
          as: 'children',
        },
        {
          model: Role,
          attributes: ['id', 'name'],
          as: 'roles',
        },
      ],
    });
  }

  async findOneById(id: number): Promise<Menu> {
    return await this.menuRepository.findOne<Menu>({
      where: { id },
      include: [
        {
          model: Menu,
          attributes: ['id', 'name'],
          as: 'parent',
        },
        {
          model: Menu,
          attributes: ['id', 'name'],
          include: [
            {
              model: Menu,
              attributes: ['id', 'name'],
              as: 'children',
            },
          ],
          as: 'children',
        },
        {
          model: Role,
          attributes: ['id', 'name'],
          as: 'roles',
        },
      ],
    });
  }

  async findByRole(id: number): Promise<Menu[]> {
    return await this.menuRepository.findAll<Menu>({
      where: { id: id },
      order: [['name', 'ASC']],
    });
  }

  async create(Menu: MenuDto, userId: number): Promise<Menu> {
    Menu.createdBy = userId;
    Menu.updatedBy = userId;
    return await this.menuRepository.create<Menu>(Menu);
  }

  async update(Menu: MenuDto, userId: number): Promise<{ affectedRows }> {
    Menu.updatedBy = userId;
    const id = Menu.id;

    let numberOfAffectedRows = [];

    await this.menuRepository
      .update({ ...Menu }, { where: { id }, returning: true })
      .then(function ([, rows]) {
        numberOfAffectedRows = rows;
      });

    return { affectedRows: numberOfAffectedRows };
  }

  async delete(id: number) {
    const affectedRows = await this.menuRepository.destroy({ where: { id } });

    return { affectedRows };
  }
}
