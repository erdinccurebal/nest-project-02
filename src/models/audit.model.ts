import { ApiProperty } from "@nestjs/swagger";

export class AuditModel {
  @ApiProperty({ required: false })
  active: boolean;

  @ApiProperty({ required: false })
  createdBy: string;

  @ApiProperty({ required: false })
  createdDate: Date;

  @ApiProperty({ required: false })
  modifiedBy: string;

  @ApiProperty({ required: false })
  modifiedDate: Date;
}