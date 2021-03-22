import { AuditModel } from './../models/audit.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CommentModel extends Document {

  _id: string;

  @Prop({type: String})
  userId: string;

  @Prop({type: String})
  content: string;

  @Prop({type: Object})
  audit: AuditModel;
}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);