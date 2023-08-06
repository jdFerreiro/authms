import { UserRole } from '@Entities/userRole.entity';
import { USERROLE_REPOSITORY } from 'src/core/constants';

export const userRolesProviders = [
  {
    provide: USERROLE_REPOSITORY,
    useValue: UserRole,
  },
];
