import { AuditModel } from './../models/audit.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CategoryModel extends Document {

  _id: string;

  @Prop({type: String})
  name: string;

  @Prop({type: String})
  skug: string

  @Prop({type: Object})
  audit: AuditModel;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryModel);