import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterModel } from 'src/models/filter.model';
import { PostModel } from 'src/schemas/post.schema';
import { PostService } from './post.service';
import { PostCreateDto, PostUpdateDto } from '../../dtos/post.dto';
import { Roles } from 'src/decorators/role.decarator';

@ApiBearerAuth()
@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private postService: PostService
  ) { }

 
  @Roles('postFindAll')
  @Get('all')
  async findAll(@Query() query: FilterModel): Promise<PostModel[]> {
    return await this.postService.findAll(query);
  }

  @Roles('postFindOne')
  @Get('one/:id')
  async findOne(@Param('id') id: string): Promise<PostModel> {
    return await this.postService.findOne(id);
  }

  @Roles('postCreate')
  @Post('create')
  async create(@Body() body: PostCreateDto): Promise<PostModel> {
    return await this.postService.create(body);
  }

  @Roles('postUpdate')
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() body: PostUpdateDto): Promise<PostModel> {
    return await this.postService.update(id, body);
  }

  @Roles('postDelete')
  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<PostModel> {
    return await this.postService.delete(id);
  }
  
}
