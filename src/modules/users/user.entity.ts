import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statusId: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  statusDate: Date;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: ['male', 'female'],
  })
  gender: string;

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

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  deletedBy: number;
}
