import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './models/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51'
    })
  }

  public async validate(payload: JwtPayload): Promise<any> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
