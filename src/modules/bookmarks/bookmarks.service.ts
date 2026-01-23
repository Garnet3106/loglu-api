import { HttpStatus, Injectable } from '@nestjs/common';
import { BookmarkDto, CreateBookmarkDto, FindBookmarkDto, UpdateBookmarkDto } from './bookmarks.dto';
import { User } from '../users/user.dto';
import { prisma } from '@src/prisma';
import { HttpError } from '@src/exceptions/exception';
import { HashtagsService } from '../hashtags/hashtags.service';

@Injectable()
export class BookmarksService {
  async find(dto: FindBookmarkDto, user: User): Promise<BookmarkDto[]> {
    const bookmarks = await prisma.bookmark.findMany({
      orderBy: { createdAt: 'desc' },
      skip: dto.offset,
      take: dto.limit,
      where: {
        ownerId: user.id,
        hashtags: dto.hashtag ? { some: { name: dto.hashtag } } : undefined,
      },
      include: { hashtags: true },
    });
    return bookmarks.map((bookmark) => BookmarksService.generateBookmark(bookmark));
  }

  async create(dto: CreateBookmarkDto, user: User): Promise<BookmarkDto> {
    const bookmark = await prisma.bookmark.create({
      data: {
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
        url: dto.url,
        thumbnailUrl: dto.thumbnailUrl,
      },
      include: { hashtags: true },
    });
    await prisma.hashtag.updateMany({
      where: { ownerId: user.id, name: { in: dto.hashtags } },
      data: { referredAt: new Date() },
    });
    return BookmarksService.generateBookmark(bookmark);
  }

  async update(dto: UpdateBookmarkDto, user: User): Promise<BookmarkDto> {
    const count = await prisma.bookmark.count({
      where: { id: dto.id, ownerId: user.id },
    });
    if (count === 0) {
      throw new HttpError(HttpStatus.BAD_REQUEST, 'specified bookmark id not found');
    }
    const bookmark = await prisma.bookmark.update({
      data: {
        editedAt: new Date(dto.editedAt),
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
        url: dto.url,
        thumbnailUrl: dto.thumbnailUrl,
      },
      where: { id: dto.id, ownerId: user.id },
      include: { hashtags: true },
    });
    await prisma.hashtag.updateMany({
      where: { ownerId: user.id, name: { in: dto.hashtags } },
      data: { referredAt: new Date() },
    });
    return BookmarksService.generateBookmark(bookmark);
  }

  static generateBookmark(bookmark: any): BookmarkDto {
    return {
      id: bookmark.id,
      createdAt: bookmark.createdAt,
      editedAt: bookmark.editedAt,
      title: bookmark.title,
      hashtags: bookmark.hashtags.map((hashtag: any) => HashtagsService.generateHashtag(hashtag)),
      url: bookmark.url,
      thumbnailUrl: bookmark.thumbnailUrl,
    };
  }
}
