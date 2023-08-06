import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsToMany,
  BelongsTo,
  HasMany,
  Sequelize,
} from 'sequelize-typescript';
import { MenuRole } from './menurole.entity';
import { Role } from './role.entity';

@Table({
  tableName: 'menuoptions',
})
export class Menu extends Model<Menu> {
  @ForeignKey(() => MenuRole)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Menu)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  parentId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  menuPath: string;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: ['active', 'inactive'],
  })
  status: string;

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

  @BelongsToMany(() => Role, () => MenuRole)
  roles: Role[];

  @BelongsTo(() => Menu)
  parent: Menu[];

  @HasMany(() => Menu)
  children: Menu[];
}
