import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  Sequelize,
} from 'sequelize-typescript';
import { Role } from './role.entity';
import { User } from './user.entity';

@Table({
  tableName: 'userroles',
})
export class UserRole extends Model<UserRole> {
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  roleId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  userId: number;

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

  @HasMany(() => User)
  users: User[];

  @HasMany(() => Role)
  roles: Role[];
}
