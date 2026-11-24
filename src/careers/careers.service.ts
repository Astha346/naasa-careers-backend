import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Job, JobDocument } from './schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class CareersService {
  constructor(
    @InjectModel(Job.name)
    private readonly jobModel: Model<JobDocument>,
  ) {}

  // Get all jobs
  async findAll() {
    return this.jobModel.find().sort({ createdAt: -1}).exec();
  }

  // Get one job by ID
  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid job ID');
    }

    const job = await this.jobModel.findById(id).exec();

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }

  // Create a new job
  async create(createJobDto: CreateJobDto) {
    const newJob = new this.jobModel(createJobDto);
    return newJob.save();
  }

  // Update an existing job
  async update(id: string, updateJobDto: UpdateJobDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid job ID');
    }

    const updatedJob = await this.jobModel
      .findByIdAndUpdate(id, updateJobDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedJob) {
      throw new NotFoundException('Job not found');
    }

    return updatedJob;
  }

  // Delete a job
  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid job ID');
    }

    const deletedJob = await this.jobModel.findByIdAndDelete(id).exec();

    if (!deletedJob) {
      throw new NotFoundException('Job not found');
    }

    return {
      message: 'Job deleted successfully',
    };
  }
}