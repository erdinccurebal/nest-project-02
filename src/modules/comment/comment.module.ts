import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from '../../schemas/comment.schema';


@Module({
    imports: [MongooseModule.forFeature([{ name: 'comment', schema: CommentSchema }])],
    controllers: [
        CommentController,],
    providers: [
        CommentService,],
})
export class CommentModule { }
