
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ required: true, trim: true })
  department!: string;

  @Prop({ required: true, trim: true })
  location!: string;

  @Prop({ required: true })
  employmentType!: string;

  @Prop({ required: true })
  experience!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ default: true })
  isActive!: boolean;
}

export const JobSchema = SchemaFactory.createForClass(Job);
