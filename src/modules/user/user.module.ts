import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserSchema } from '../../schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
    controllers: [
        UserController,],
    providers: [
        UserService,],
})
export class UserModule { }
