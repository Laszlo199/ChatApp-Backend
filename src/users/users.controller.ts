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
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @Post()
  signIn(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signIn(createUserDto);
  }

  /*@Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }*/

  /*@Get()
  findAll() {
    return this.usersService.findAll();
  }

   */

  /**returns a list of all users with friend status
   *
   * @param id of a logged in user
   */
  @Get(':userId')
  GetAll(@Param('id') id: number) {
    return this.usersService.getAllUsers(id);
  }

  @Get(':id')
  findOne(
    @Param('username') username: string,
    @Param('password') pass: string,
  ) {
    return this.usersService.findOne(username, pass);
  }

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
