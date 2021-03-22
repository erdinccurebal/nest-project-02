import { AuditModel } from './../models/audit.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NavModel extends Document {

  _id: string;

  @Prop({type: String})
  name: string;

  @Prop({type: Object})
  audit: AuditModel;
}

export const NavSchema = SchemaFactory.createForClass(NavModel);