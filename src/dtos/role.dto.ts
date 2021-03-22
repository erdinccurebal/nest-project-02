import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsArray, IsEmpty, IsNotEmpty, IsObject, IsOptional, IsString, Length } from "class-validator";
import { AuditModel } from "src/models/audit.model";

export class RoleCreateDto {
  @IsNotEmpty()
  @IsString()
  @Length(1,10)
  @ApiProperty()
  name: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({required: false})
  perms: Array<String>;

  @IsEmpty()
  audit: AuditModel;
}

export class RoleUpdateDto {

  @IsString()
  @Length(1, 10)
  @IsOptional()
  @ApiProperty({required: false})
  name: string;
  
  @IsOptional()
  @IsArray()
  @ApiProperty({required: false})
  perms: Array<String>;

  @IsEmpty()
  audit: AuditModel;
}