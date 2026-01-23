import { Injectable } from '@nestjs/common';
import { prisma } from '@src/prisma';
import { User } from '@src/modules/users/user.dto';
import { HashtagDto } from './hashtag.dto';

@Injectable()
export class HashtagsService {
  async find(user: User): Promise<HashtagDto[]> {
    const hashtags = await prisma.hashtag.findMany({
      orderBy: { referredAt: 'desc' },
      where: { ownerId: user.id },
    });
    return hashtags.map((hashtag) => HashtagsService.generateHashtag(hashtag));
  }

  static generateHashtag(hashtag: any): HashtagDto {
    return {
      id: hashtag.id,
      name: hashtag.name,
    };
  }
}
