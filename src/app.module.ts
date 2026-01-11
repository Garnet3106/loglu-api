import { Module } from '@nestjs/common';
import { MemosModule } from './modules/memos/memos.module';

@Module({
  imports: [MemosModule],
})
export class AppModule {}
