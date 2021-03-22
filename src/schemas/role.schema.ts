import { AuditModel } from './../models/audit.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RoleModel extends Document {

  _id: string;

  @Prop({type: String})
  name: string;

  @Prop({type: Array})
  perms: Array<String>;

  @Prop({type: Object})
  audit: AuditModel;
}

export const RoleSchema = SchemaFactory.createForClass(RoleModel);