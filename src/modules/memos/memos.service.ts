import { Injectable } from '@nestjs/common';

@Injectable()
export class MemosService {
  find() {
    return ['hello'];
  }
}
