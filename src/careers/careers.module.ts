import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CareersController } from './careers.controller';
import { CareersService } from './careers.service';
import { Job, JobSchema } from './schemas/job.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Job.name, schema: JobSchema },
    ]),
  ],
  controllers: [CareersController],
  providers: [CareersService],
})
export class CareersModule {}