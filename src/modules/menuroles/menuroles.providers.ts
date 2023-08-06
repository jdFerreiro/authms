import { MenuRole } from '@Entities/menurole.entity';
import { MENUROLE_REPOSITORY } from 'src/core/constants';

export const menuRolesProviders = [
  {
    provide: MENUROLE_REPOSITORY,
    useValue: MenuRole,
  },
];
