import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { AuditModel } from "src/models/audit.model";

export class CommentCreateDto {

  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 500)
  @ApiProperty()
  content: string;

  @IsEmpty()
  audit: AuditModel;

}

export class CommentUpdateDto {
  
  @IsOptional()
  @IsString()
  @Length(2, 30)
  @ApiProperty({required: false})
  userId: string;

  @IsOptional()
  @IsString()
  @Length(2, 500)
  @ApiProperty({required: false})
  content: string;

  @IsEmpty()
  audit: AuditModel;

}