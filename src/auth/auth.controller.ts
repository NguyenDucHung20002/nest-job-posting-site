import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Publish, ResponseMessage } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';

@Controller('auth') // => /users
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Publish()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('Login successfully!')
  @Post('/login')
  handleLogin(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }
}
