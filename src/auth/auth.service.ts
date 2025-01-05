import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload: JwtPayload = { email: user.email, sub: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(signupDto: SignupDto) {
    const { email, password, fullName } = signupDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({
      email,
      password: hashedPassword,
      fullName,
    });
  }
}
