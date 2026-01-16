import { Module } from '@nestjs/common';
import { MemosModule } from './modules/memos/memos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MemosModule, UsersModule],
})
export class AppModule {}
