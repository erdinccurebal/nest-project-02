import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decarator';
import { FilterModel } from 'src/models/filter.model';
import { CommentModel } from 'src/schemas/comment.schema';
import { CommentCreateDto, CommentUpdateDto } from '../../dtos/comment.dto';
import { CommentService } from './comment.service';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(
    private commentService: CommentService
  ) { }

  @Roles('commentFindAll')
  @Get('all')
  async findAll(@Query() query: FilterModel): Promise<CommentModel[]> {
    return await this.commentService.findAll(query);
  }

  @Roles('commentFindOne')
  @Get('one/:id')
  async findOne(@Param('id') id: string): Promise<CommentModel> {
    return await this.commentService.findOne(id);
  }
  
  @Roles('commentCreate')
  @Post('create')
  async create(@Body() body: CommentCreateDto): Promise<CommentModel> {
    return await this.commentService.create(body);
  }

  @Roles('commentUpdate')
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() body: CommentUpdateDto): Promise<CommentModel> {
    return await this.commentService.update(id, body);
  }

  @Roles('commentDelete')
  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<CommentModel> {
    return await this.commentService.delete(id);
  }
  
}
