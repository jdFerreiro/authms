import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
  Sequelize,
  HasMany,
} from 'sequelize-typescript';
import { Status } from './status.entity';
import { Role } from './role.entity';
import { UserRole } from './userRole.entity';
import { Audit } from './Audit.entity';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @ForeignKey(() => UserRole)
  @ForeignKey(() => Audit)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  bornDate: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  statusId: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  statusDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  createdAt: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  createdBy: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  updatedAt: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  updatedBy: number;

  @BelongsTo(() => Status)
  status: Status;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasMany(() => Audit)
  audits: Audit[];
}
