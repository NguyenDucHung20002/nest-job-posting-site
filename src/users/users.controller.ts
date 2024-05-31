import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Publish, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/type/users.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users') // => /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseMessage('Register a new user!')
  create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
    return this.usersService.create(createUserDto, user);
  }

  @Publish()
  @Post('register')
  @ResponseMessage('Register a new user!')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }

  @Get()
  @ResponseMessage('Query user')
  findAll(
    @Query('page') currentPage: string,
    @Query('limit') limit: string,
    @Query() qs: string,
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Get profile')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Publish()
  @Get(':id')
  @ResponseMessage('Fetch user by id')
  async findOne(
    @Param('id')
    id: string,
  ) {
    const findUser = await this.usersService.findOne(id);
    return findUser;
  }

  @Patch()
  @ResponseMessage('Updated a user!')
  update(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    return this.usersService.update(updateUserDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Deleted a user!')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }
}
