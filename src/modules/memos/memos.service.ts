import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpError } from '@src/exceptions/exception';
import { CreateMemoDto, FindMemoDto, MemoDto, UpdateMemoDto } from '@src/modules/memos/memos.dto';
import { prisma } from '@src/prisma';
import { User } from '@src/users/user.dto';
import { HashtagsService } from '../hashtags/hashtags.service';

@Injectable()
export class MemosService {
  async find(dto: FindMemoDto, user: User): Promise<MemoDto[]> {
    const memos = await prisma.memo.findMany({
      orderBy: { date: 'desc' },
      skip: dto.offset,
      take: dto.limit,
      where: {
        ownerId: user.id,
        hashtags: dto.hashtag ? { some: { name: dto.hashtag } } : undefined,
      },
      include: { hashtags: true },
    });
    return memos.map((memo) => MemosService.generateMemo(memo));
  }

  async create(dto: CreateMemoDto, user: User): Promise<MemoDto> {
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
    await prisma.hashtag.updateMany({
      where: { ownerId: user.id, name: { in: dto.hashtags } },
      data: { referredAt: new Date() },
    });
    return MemosService.generateMemo(memo);
  }

  async update(dto: UpdateMemoDto, user: User): Promise<MemoDto> {
    const count = await prisma.memo.count({
      where: { id: dto.id, ownerId: user.id },
    });
    if (count === 0) {
      throw new HttpError(HttpStatus.BAD_REQUEST, 'specified memo id not found');
    }
    const memo = await prisma.memo.update({
      data: {
        date: new Date(dto.date),
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
      where: { id: dto.id, ownerId: user.id },
      include: { hashtags: true },
    });
    await prisma.hashtag.updateMany({
      where: { ownerId: user.id, name: { in: dto.hashtags } },
      data: { referredAt: new Date() },
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
      hashtags: memo.hashtags.map((hashtag: any) => HashtagsService.generateHashtag(hashtag)),
    };
  }
}
