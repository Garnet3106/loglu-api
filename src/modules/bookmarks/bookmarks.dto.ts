import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Hashtag } from '@src/generated/prisma/client';

export class BookmarkDto {
  id: number;
  createdAt: Date;
  editedAt: Date;
  title: string;
  hashtags: Hashtag[];
  url: string;
  thumbnailUrl: string;
}

export class FindBookmarkDto {
  constructor(
    public offset: number,
    public limit: number,
    public hashtag?: string,
  ) {}
}

export class CreateBookmarkDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString({ each: true })
  hashtags: string[];

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  thumbnailUrl: string;
}

export class UpdateBookmarkDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsDateString()
  editedAt: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString({ each: true })
  hashtags: string[];

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  thumbnailUrl: string;
}
