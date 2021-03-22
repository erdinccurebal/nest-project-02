import { UploadModule } from './modules/upload/upload.module';
import { CommentModule } from './modules/comment/comment.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/exception.filter';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { NavModule } from './modules/nav/nav.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import environment from './environments/environment';
import { APP_PIPE } from '@nestjs/core';
import { TokenMiddleware } from 'src/middlewares/token.middleware';
import { AuthGuard } from './guards/auth.guard';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';

@Module({
  imports: [
    UploadModule,
    CommentModule,
    RoleModule,
    AuthModule,
    CategoryModule,
    NavModule,
    PostModule,
    UserModule,
    MulterModule.register({
      dest: './uploads',
    }),
    MongooseModule.forRoot(environment.mongoUrl, { useFindAndModify: false }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
