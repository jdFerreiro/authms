import { Status } from '@Entities/status.entity';
import { User } from '@Entities/user.entity';
import { Injectable, Inject } from '@nestjs/common';
import { StatusDto } from '../DTOs/status.dto';
import { STATUS_REPOSITORY } from 'src/core/constants';

@Injectable()
export class StatusService {
  constructor(
    @Inject(STATUS_REPOSITORY)
    private readonly StatusRepository: typeof Status,
  ) {}

  async findAll(): Promise<Status[]> {
    return await this.StatusRepository.findAll<Status>({
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
          as: 'users',
        },
      ],
    });
  }

  async findOneById(id: number): Promise<Status> {
    return await this.StatusRepository.findOne<Status>({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
          as: 'users',
        },
      ],
    });
  }

  async create(status: StatusDto, userId: number): Promise<Status> {
    status.createdBy = userId;
    status.updatedBy = userId;
    return await this.StatusRepository.create<Status>(status);
  }

  async update(
    id: number,
    Status: StatusDto,
    userId: number,
  ): Promise<{ affectedRows }> {
    Status.updatedBy = userId;

    let numberOfAffectedRows = [];

    await this.StatusRepository.update(
      { ...Status },
      { where: { id }, returning: true },
    ).then(function ([, rows]) {
      numberOfAffectedRows = rows;
    });

    return { affectedRows: numberOfAffectedRows };
  }

  async delete(id: number) {
    return await this.StatusRepository.destroy({ where: { id } });
  }
}
