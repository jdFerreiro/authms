import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  Sequelize,
} from 'sequelize-typescript';
import { Menu } from './menu.entity';
import { Role } from './role.entity';

@Table({
  tableName: 'menuroles',
})
export class MenuRole extends Model<MenuRole> {
  @ForeignKey(() => Menu)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
  })
  menuId: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
  })
  roleId: number;

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

  @HasMany(() => Menu)
  menus: Menu[];

  @HasMany(() => Role)
  roles: Role[];
}
