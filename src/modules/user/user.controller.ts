import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterModel } from 'src/models/filter.model';
import { UserCreateDto, UserUpdateDto } from 'src/dtos/user.dto';
import { UserModel } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { Roles } from 'src/decorators/role.decarator';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService
  ) { }


  @Roles('userFindAll')
  @Get('all')
  async findAll(@Query() query: FilterModel): Promise<UserModel[]> {
    return await this.userService.findAll(query);
  }

  @Roles('userFindOne')
  @Get('one/:id')
  async findOne(@Param('id') id: string): Promise<UserModel> {
    return await this.userService.findOne(id);
  }

  @Roles('userCreate')
  @Post('create')
  async create(@Body() body: UserCreateDto): Promise<UserModel> {
    body.password = await this.userService.convertHash(body.password);
    return await this.userService.create(body);
  }

  @Roles('userUpdate')
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() body: UserUpdateDto): Promise<UserModel> {
    return await this.userService.update(id, body);
  }

  @Roles('userDelete')
  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<UserModel> {
    return await this.userService.delete(id);
  }
  
}
