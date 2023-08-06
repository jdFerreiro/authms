import { Status } from '../entities/status.entity';
import { STATUS_REPOSITORY } from 'src/core/constants';

export const statusesProviders = [
  {
    provide: STATUS_REPOSITORY,
    useValue: Status,
  },
];
