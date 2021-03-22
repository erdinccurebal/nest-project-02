import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { AuditModel } from "src/models/audit.model";

export class NavCreateDto {

  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  @ApiProperty()
  slug: string;

  @IsEmpty()
  audit: AuditModel;

}

export class NavUpdateDto {
  
  @IsOptional()
  @IsString()
  @Length(2, 20)
  @ApiProperty({required: false})
  name: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  @ApiProperty({required: false})
  slug: string;

  @IsEmpty()
  audit: AuditModel;

}