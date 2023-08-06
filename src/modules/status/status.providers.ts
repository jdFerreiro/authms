import { Status } from '@Entities/status.entity';
import { STATUS_REPOSITORY } from 'src/core/constants';

export const statusesProviders = [
  {
    provide: STATUS_REPOSITORY,
    useValue: Status,
  },
];
