import { Injectable, Inject } from '@nestjs/common';
import { Audit } from '@Entities/Audit.entity';
import { AuditDto } from '@Dtos/Audit.dto';
import { AUDIT_REPOSITORY } from 'src/core/constants';
import { User } from '@Entities/user.entity';
import { Op } from 'sequelize';

@Injectable()
export class AuditService {
  constructor(
    @Inject(AUDIT_REPOSITORY) private readonly auditRepository: typeof Audit,
  ) {}

  async findAll(): Promise<Audit[]> {
    return await this.auditRepository.findAll<Audit>({
      include: [
        {
          model: User,
          attributes: ['name'],
          as: 'users',
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async findOneById(id: number): Promise<Audit> {
    return await this.auditRepository.findOne<Audit>({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['name'],
          as: 'users',
        },
      ],
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Audit[]> {
    return await this.auditRepository.findAll<Audit>({
      where: { createdAt: { [Op.between]: [startDate, endDate] } },
      include: [
        {
          model: User,
          attributes: ['name'],
          as: 'users',
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async findByUser(createdBy: number): Promise<Audit[]> {
    console.log(createdBy);
    return await this.auditRepository.findAll<Audit>({
      where: { createdBy },
      order: [['createdAt', 'DESC']],
    });
  }

  async create(Audit: AuditDto, userId: number): Promise<Audit> {
    Audit.createdBy = userId;
    Audit.updatedBy = userId;
    return await this.auditRepository.create<Audit>(Audit);
  }
}
