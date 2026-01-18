import { Injectable } from '@nestjs/common';
import { CreateMemoDto, FindMemoDto, MemoDto } from '@src/modules/memos/memos.dto';
import { prisma } from '@src/prisma';
import { User } from '@src/users/user.dto';

@Injectable()
export class MemosService {
  async find(dto: FindMemoDto, user: User): Promise<MemoDto[]> {
    const memos = await prisma.memo.findMany({
      orderBy: { date: 'desc' },
      skip: dto.offset,
      take: dto.limit,
      where: { ownerId: user.id },
      include: { hashtags: true },
    });
    return memos.map((memo) => MemosService.generateMemo(memo));
  }

  async create(dto: CreateMemoDto, user: User) {
    const memo = await prisma.memo.create({
      data: {
        date: new Date(dto.date),
        ownerId: user.id,
        title: dto.title,
        hashtags: {
          connectOrCreate: dto.hashtags.map((name) => ({
            where: {
              ownerId_name: {
                ownerId: user.id,
                name,
              },
            },
            create: {
              ownerId: user.id,
              name,
            },
          })),
        },
        content: dto.content,
      },
      include: { hashtags: true },
    });
    return MemosService.generateMemo(memo);
  }

  static generateMemo(memo: any): MemoDto {
    return {
      id: memo.id,
      createdAt: memo.createdAt,
      editedAt: memo.editedAt,
      date: memo.date,
      title: memo.title,
      content: memo.content,
      hashtags: memo.hashtags,
    };
  }
}
