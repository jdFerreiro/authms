import { Injectable, Inject } from '@nestjs/common';
import { Menu } from '../entities/menu.entity';
import { MenuDto } from '../DTOs/menu.dto';
import { MENU_REPOSITORY } from 'src/core/constants';

@Injectable()
export class MenuService {
  constructor(
    @Inject(MENU_REPOSITORY) private readonly MenuRepository: typeof Menu,
  ) {}

  async create(Menu: MenuDto): Promise<Menu> {
    return await this.MenuRepository.create<Menu>(Menu);
  }

  async findAll(): Promise<Menu[]> {
    return await this.MenuRepository.findAll<Menu>({
      order: [
        ['parentId', 'ASC'],
        ['name', 'ASC'],
      ],
    });
  }

  async findOneById(id: number): Promise<Menu> {
    return await this.MenuRepository.findOne<Menu>({ where: { id } });
  }

  async findChildren(id: number): Promise<Menu[]> {
    return await this.MenuRepository.findAll<Menu>({
      where: { id: id },
      order: [
        ['parentId', 'ASC'],
        ['name', 'ASC'],
      ],
    });
  }

  async update(id: number, Menu: MenuDto): Promise<{ number; Menu }> {
    const [numberOfAffectedRows, [updateMenu]] =
      await this.MenuRepository.update(
        { ...Menu },
        { where: { id }, returning: true },
      );
    return { number: numberOfAffectedRows, Menu: updateMenu };
  }

  async delete(id: number) {
    const deleteMenu = await this.MenuRepository.destroy({ where: { id } });
    return { number: 0, Menu: deleteMenu };
  }
}
