import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsToMany,
  Sequelize,
} from 'sequelize-typescript';
import { UserRole } from './userRole.entity';
import { User } from './user.entity';
import { Menu } from './menu.entity';
import { MenuRole } from './menurole.entity';

@Table({
  tableName: 'roles',
})
export class Role extends Model<Role> {
  @ForeignKey(() => UserRole)
  @ForeignKey(() => MenuRole)
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

  @BelongsToMany(() => User, () => UserRole)
  users: User[];

  @BelongsToMany(() => Menu, () => MenuRole)
  menus: Menu[];
}
