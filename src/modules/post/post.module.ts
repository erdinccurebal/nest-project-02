import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Module } from '@nestjs/common';
import { PostSchema } from '../../schemas/post.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'post', schema: PostSchema }])],
    controllers: [
        PostController,],
    providers: [
        PostService,],
})
export class PostModule { }
