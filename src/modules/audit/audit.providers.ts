import { Audit } from '@Entities/Audit.entity';
import { AUDIT_REPOSITORY } from 'src/core/constants';

export const AuditProviders = [
  {
    provide: AUDIT_REPOSITORY,
    useValue: Audit,
  },
];
