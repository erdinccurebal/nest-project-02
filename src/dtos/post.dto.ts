import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmpty, IsNotEmpty, IsObject, IsOptional, IsString, IsUrl, Length } from "class-validator";
import { AuditModel } from "src/models/audit.model";

export class PostCreateDto {

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({required: false})
  categories: Array<String>;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  @ApiProperty({required: false})
  tags: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @Length(1, 500)
  @ApiProperty({required: false})
  image: string;

  @IsEmpty()
  audit: AuditModel;
}

export class PostUpdateDto {

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  @ApiProperty({required: false})
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({required: false})
  content: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({required: false})
  categories: Array<String>;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  @ApiProperty({required: false})
  tags: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @Length(1, 500)
  @ApiProperty({required: false})
  image: string;

  @IsEmpty()
  audit: AuditModel;
}