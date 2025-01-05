import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    const result = await this.authService.login(req.user);
    console.log(
      `User with username ${req.user.username} successfully logged in`,
    );
    return result;
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const user = await this.authService.signup(signupDto);
    console.log(`User with name ${signupDto.fullName} successfully registered`);
    return user;
  }
}
