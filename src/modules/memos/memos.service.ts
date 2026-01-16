import { Injectable } from '@nestjs/common';
import { CreateMemoDto, FindMemoDto } from '@src/modules/memos/memos.dto';
import { prisma } from '@src/prisma';
import { User } from '@src/users/user.dto';

@Injectable()
export class MemosService {
  async find(dto: FindMemoDto, user: User) {
    return await prisma.memo.findMany({
      orderBy: { date: 'desc' },
      skip: dto.offset,
      take: dto.limit,
      where: { ownerId: user.id },
    });
  }

  async create(dto: CreateMemoDto, user: User) {
    const memo = await prisma.memo.create({
      data: {
        date: new Date(dto.date),
        ownerId: user.id,
        title: dto.title,
        contentPreview: dto.content.substring(0, 20),
      },
    });
    await prisma.memoContent.create({
      data: { memoId: memo.id, content: dto.content },
    });
  }
}
