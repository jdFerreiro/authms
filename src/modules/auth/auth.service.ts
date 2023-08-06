import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '@Dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  validateApiKey(apiKey: string) {
    const apiKeys: string[] = [
      process.env.OWNER_APIKEY,
      process.env.EXTERNAL_APIKEY,
    ];

    return apiKeys.find((key) => apiKey === key);
  }

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOneByEmail(username);
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
    const result = this.validateUser(user.email, user.password);
    const payload = {
      id: (await result).id,
      email: (await result).email,
      name: (await result).name,
    };
    const token = await this.generateToken(payload);
    return { user, token };
  }

  public async create(user: UserDto) {
    user.password = await this.hashPassword(user.password);

    const newUser = await this.usersService.create({ ...user });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser['dataValues'];

    const token = await this.generateToken(result);

    return { user: result, token };
  }

  public async changePassword(
    id: number,
    password: string,
    newPassword: string,
  ) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      return null;
    }

    /*
    const match = await this.comparePassword(password, user.password);
    if (!match) {
      return null;
    }
*/

    const newPass = await this.hashPassword(newPassword);
    const result = await this.usersService.changePassword(id, newPass);

    if (result.numRec === 0) {
      return null;
    }

    return result.User;
  }

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
}
