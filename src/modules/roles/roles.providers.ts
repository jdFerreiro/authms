import { Role } from '@Entities/role.entity';
import { ROLE_REPOSITORY } from 'src/core/constants';

export const rolesProviders = [
  {
    provide: ROLE_REPOSITORY,
    useValue: Role,
  },
];
