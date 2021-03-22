import { AuditModel } from './../models/audit.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEmpty, IsNotEmpty,  IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class AuthLoginDto {
  @IsEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  @ApiProperty()
  username: string;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  @ApiProperty()
  password: string;

  @IsEmpty()
  firstname: string;

  @IsEmpty()
  lastname: string;

  @IsEmpty()
  biographt: string;

  @IsEmpty()
  birthday: Date;

  @IsEmpty()
  image: string;

  @IsEmpty()
  role: string;

  @IsEmpty()
  audit: AuditModel;
}

export class AuthRegisterDto {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Length(4, 30)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  @ApiProperty()
  password: string;

  @IsEmpty()
  firstname: string;

  @IsEmpty()
  lastname: string;

  @IsEmpty()
  biographt: string;

  @IsEmpty()
  birthday: Date;

  @IsEmpty()
  image: string;

  @IsEmpty()
  role: string;

  @IsEmpty()
  audit: AuditModel;
}

export class MyProfileUpdateDto {
  
  @IsOptional()
  @IsString()
  @IsEmail()
  @Length(4, 30)
  @ApiProperty({required: false})
  email: string;;

  @IsOptional()
  @IsString()
  @Length(4, 18)
  @ApiProperty({required: false})
  username: string;

  @IsOptional()
  @IsString()
  @Length(2, 20)
  @ApiProperty({required: false})
  password: string;

  @IsOptional()
  @IsString()
  @Length(4, 10)
  @ApiProperty({required: false})
  firstname: string;

  @IsOptional()
  @IsString()
  @Length(4, 10)
  @ApiProperty({required: false})
  lastname: string;

  @IsOptional()
  @IsString()
  @Length(4, 500)
  @ApiProperty({required: false})
  biographt: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({required: false})
  birthday: Date;

  @IsOptional()
  @IsString()
  @Length(4, 200)
  @IsUrl()
  @ApiProperty({required: false})
  image: string;

  @IsEmpty()
  role: string;

  @IsEmpty()
  audit: AuditModel;
}