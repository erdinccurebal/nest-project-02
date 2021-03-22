import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decarator';
import { FilterModel } from 'src/models/filter.model';
import { NavModel } from 'src/schemas/nav.schema';
import { NavUpdateDto, NavCreateDto } from '../../dtos/nav.dto';
import { NavService } from './nav.service';

@ApiBearerAuth()
@ApiTags('navs')
@Controller('navs')
export class NavController {
  constructor(
    private navService: NavService
  ) { }

  @Roles('navFindAll')
  @Get('all')
  async findAll(@Query() query: FilterModel): Promise<NavModel[]> {
    return await this.navService.findAll(query);
  }

  @Roles('navFindOne')
  @Get('one/:id')
  async findOne(@Param('id') id: string): Promise<NavModel> {
    return await this.navService.findOne(id);
  }
  
  @Roles('navCreate')
  @Post('create')
  async create(@Body() body: NavCreateDto): Promise<NavModel> {
    return await this.navService.create(body);
  }

  @Roles('navUpdate')
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() body: NavUpdateDto): Promise<NavModel> {
    return await this.navService.update(id, body);
  }

  @Roles('navDelete')
  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<NavModel> {
    return await this.navService.delete(id);
  }
  
}
