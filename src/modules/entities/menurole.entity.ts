import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'menuroles',
})
export class MenuRole extends Model<MenuRole> {
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  menuId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId: number;

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
