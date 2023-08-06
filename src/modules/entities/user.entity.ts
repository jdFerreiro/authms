import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { Status } from './status.entity';
import { Role } from './role.entity';
import { UserRole } from './userRole.entity';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
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

  @ForeignKey(() => Status)
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

  @BelongsTo(() => Status)
  status: Status;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
