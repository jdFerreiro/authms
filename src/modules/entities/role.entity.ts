import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserRole } from './userRole.entity';
import { User } from './user.entity';

@Table({
  tableName: 'roles',
})
export class Role extends Model<Role> {
  @ForeignKey(() => UserRole)
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
    allowNull: false,
  })
  createdBy: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  updatedBy: number;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
