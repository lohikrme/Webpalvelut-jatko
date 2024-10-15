// app.controller.ts
// updated 15th october 2024

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'prints hello world' })
  getHello(): string {
    return this.appService.getHello();
  }
}
