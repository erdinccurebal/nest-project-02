import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthLoginDto, AuthRegisterDto } from '../../dtos/auth.dto';
import { UserModel } from '../../schemas/user.schema';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('login')
  async login(@Body() body: AuthLoginDto): Promise<UserModel> {
    return await this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto): Promise<UserModel> {
    body.password = await this.authService.convertHash(body.password);
    return await this.authService.register(body);
  }

  @Get('confirmation/:token')
  async confirmation(@Param('token') confirm: string): Promise<UserModel> {
    return await this.authService.confirmation(confirm);
  }

  @Post('email/:email')
  async emailConfirmation(@Param('email') email: string): Promise<UserModel> {
    return await this.authService.emailConfirmation(email);
  }

  @Post('lostemail/:email')
  async lostPassword(@Param('email') email: string): Promise<UserModel> {
    return await this.authService.lostPassword(email);
  }

  @Get('lostconfirm/:token')
  async lostConfirm(@Param('token') token: string): Promise<UserModel> {
    return await this.authService.lostConfirm(token);
  }

}
