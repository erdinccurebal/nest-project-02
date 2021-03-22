import { AuditModel } from './../models/audit.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PostModel extends Document {

  _id: string;

  @Prop({type: String})
  title: string;
  
  @Prop({type: String})
  content: string;

  @Prop({type: Array})
  categories: Array<String>;

  @Prop({type: String})
  tags: string;

  @Prop({type: String})
  image: string;

  @Prop({type: Object})
  audit: AuditModel;
}

export const PostSchema = SchemaFactory.createForClass(PostModel);