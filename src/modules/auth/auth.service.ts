import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async comparePassword(enteredPassword: string, dbPassword: string) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  private async generateToken(user: any) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password: any) {
    const salt: number = Number.parseInt(process.env.SALTROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      return null;
    }

    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    // tslint:disable-next-line: no-string-literal
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async login(user: any) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async create(user: UserDto) {
    const pass = await this.hashPassword(user.password);

    const newUser = await this.userService.create({ ...user, password: pass });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser['dataValues'];

    const token = await this.generateToken(result);

    return { user: result, token };
  }
}
