import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])
    ],
    controllers: [
        AuthController,],
    providers: [
        AuthService,UserService],
})
export class AuthModule { }
