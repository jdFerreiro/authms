import { Menu } from '@Entities/menu.entity';
import { MENU_REPOSITORY } from 'src/core/constants';

export const menuProviders = [
  {
    provide: MENU_REPOSITORY,
    useValue: Menu,
  },
];
