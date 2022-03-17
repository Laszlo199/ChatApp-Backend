import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //and we get two oh one Created response with the created user
  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @Post()
  signIn(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signIn(createUserDto);
  }

  /**returns a list of all users with friend status
   *
   * @param id of a logged in user
   */
  @Get('userId/:id')
  GetAll(@Param('id') id: number) {
    return this.usersService.getAllUsers(+id);
  }
}
