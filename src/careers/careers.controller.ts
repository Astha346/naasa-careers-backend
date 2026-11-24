import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CareersService } from './careers.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@ApiTags('Careers')
@Controller('careers/jobs')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all jobs' })
  findAll() {
    return this.careersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one job by ID' })
  findOne(@Param('id') id: string) {
    return this.careersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new job' })
  create(@Body() createJobDto: CreateJobDto) {
    return this.careersService.create(createJobDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a job' })
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
  ) {
    return this.careersService.update(id, updateJobDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job' })
  remove(@Param('id') id: string) {
    return this.careersService.remove(id);
  }
}