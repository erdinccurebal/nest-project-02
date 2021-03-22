import { AuditModel } from './../models/audit.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserModel extends Document {
  _id: string;

  @Prop({type: String})
  email: string;

  @Prop({type: String})
  username: string;

  @Prop({type: String})
  password: string;

  @Prop({type: String})
  firstname: string;

  @Prop({type: String})
  lastname: string;

  @Prop({type: String})
  biographt: string;

  @Prop({type: Date})
  birthday: Date;

  @Prop({type: String})
  image: string;

  @Prop({type: String})
  roleId: string;

  @Prop({type: Object})
  audit: AuditModel;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);