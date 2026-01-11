import { Controller, Get } from '@nestjs/common';
import { MemosService } from './memos.service';

@Controller('memos')
export class MemosController {
  constructor(private readonly memosService: MemosService) {}

  @Get()
  find() {
    return this.memosService.find();
  }
}
