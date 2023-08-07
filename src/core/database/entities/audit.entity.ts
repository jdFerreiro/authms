import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Sequelize,
} from 'sequelize-typescript';
import { User } from './user.entity';

@Table({
  tableName: 'audits',
})
export class Audit extends Model<Audit> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: ['select', 'create', 'update', 'delete'],
  })
  action: string;

  @Column({
    type: DataType.STRING(450),
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  ipAddress: string;

  @Column({
    type: DataType.STRING(5000),
    allowNull: false,
  })
  payload: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  createdAt: Date;

  @ForeignKey(() => User)
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

  @BelongsTo(() => User)
  users: User[];
}
