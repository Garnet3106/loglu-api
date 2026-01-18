import { Module } from '@nestjs/common';
import { MemosModule } from './modules/memos/memos.module';
import { UsersModule } from './users/users.module';
import { HashtagsModule } from './modules/hashtags/hashtags.module';

@Module({
  imports: [MemosModule, UsersModule, HashtagsModule],
})
export class AppModule {}
