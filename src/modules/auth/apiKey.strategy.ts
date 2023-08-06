import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { AuthService } from './auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private authService: AuthService) {
    super({ header: 'x-api-key', prefix: '' }, true, async (apiKey, done) => {
      const checkKey = authService.validateApiKey(apiKey);

      if (!checkKey) {
        return done(new UnauthorizedException(), null);
      }

      return done(null, true);
    });
  }
}
