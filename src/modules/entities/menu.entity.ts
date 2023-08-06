import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

@Table({
  tableName: 'menuoptions',
})
export class Menu extends Model<Menu> {
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  createdBy: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  updatedBy: number;
}
