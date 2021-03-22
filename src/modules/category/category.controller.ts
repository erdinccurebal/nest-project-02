import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterModel } from 'src/models/filter.model';
import { CategoryModel } from 'src/schemas/category.schema';
import { CategoryService } from './category.service';
import { CategoryCreateDto, CategoryUpdateDto } from '../../dtos/category.dto';
import { Roles } from 'src/decorators/role.decarator';

@ApiBearerAuth()
@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(
    private categoryService: CategoryService
  ) { }

  @Roles('categoryFindAll')
  @Get('all')
  async findAll(@Query() query: FilterModel): Promise<CategoryModel[]> {
    return await this.categoryService.findAll(query);
  }

  @Roles('categoryFindOne')
  @Get('one/:id')
  async findOne(@Param('id') id: string): Promise<CategoryModel> {
    return await this.categoryService.findOne(id);
  }

  @Roles('categoryCreate')
  @Post('create')
  async create(@Body() body: CategoryCreateDto): Promise<CategoryModel> {
    return await this.categoryService.create(body);
  }

  @Roles('categoryUpdate')
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() body: CategoryUpdateDto): Promise<CategoryModel> {
    return await this.categoryService.update(id, body);
  }

  @Roles('categoryDelete')
  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<CategoryModel> {
    return await this.categoryService.delete(id);
  }
  
}
