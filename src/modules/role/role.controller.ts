import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decarator';
import { RoleCreateDto, RoleUpdateDto } from 'src/dtos/role.dto';
import { FilterModel } from 'src/models/filter.model';
import { RoleModel } from 'src/schemas/role.schema';
import { RoleService } from './role.service';


@ApiBearerAuth()
@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(
    private roleService: RoleService
  ) { }

  @Roles('roleFindAll')
  @Get('all')
  async findAll(@Query() query: FilterModel): Promise<RoleModel[]> {
    return await this.roleService.findAll(query);
  }

  @Roles('roleFindOne')
  @Get('one/:id')
  async findOne(@Param('id') id: string): Promise<RoleModel> {
    return await this.roleService.findOne(id);
  }

  @Roles('roleCreate')
  @Post('create')
  async create(@Body() body: RoleCreateDto): Promise<RoleModel> {
    return await this.roleService.create(body);
  }

  @Roles('roleUpdate')
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() body: RoleUpdateDto): Promise<RoleModel> {
    return await this.roleService.update(id, body);
  }

  @Roles('roleDelete')
  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<RoleModel> {
    return await this.roleService.delete(id);
  }


}
