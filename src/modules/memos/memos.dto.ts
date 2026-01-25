import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MemoDto {
  id: number;
  createdAt: Date;
  editedAt: Date;
  date: Date;
  title: String;
  content: String;
  hashtags: HashTagDto[];
}

export class HashTagDto {
  id: number;
  name: string;
}

export class FindMemoDto {
  constructor(
    public offset: number,
    public limit: number,
    public hashtag?: string,
  ) {}
}

export class CreateMemoDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString({ each: true })
  hashtags: string[];

  @IsNotEmpty()
  @IsString()
  content: string;
}

export class UpdateMemoDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsDateString()
  editedAt: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString({ each: true })
  hashtags: string[];

  @IsNotEmpty()
  @IsString()
  content: string;
}
