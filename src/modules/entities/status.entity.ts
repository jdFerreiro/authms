import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { User } from './user.entity';

@Table({
  tableName: 'statuses',
})
export class Status extends Model<Status> {
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  createdBy: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  updatedBy: number;

  @HasMany(() => User)
  users: User[];
}
