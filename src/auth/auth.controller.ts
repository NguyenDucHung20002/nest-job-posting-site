import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // => /users
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
