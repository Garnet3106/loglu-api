import { Module } from '@nestjs/common';
import { MemosModule } from '@src/modules/memos/memos.module';
import { UsersModule } from '@src/modules/users/users.module';
import { HashtagsModule } from '@src/modules/hashtags/hashtags.module';

@Module({
  imports: [MemosModule, UsersModule, HashtagsModule],
})
export class AppModule {}
