import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsNotEmpty()
  @IsNumber()
  offset: number;

  @IsNotEmpty()
  @IsNumber()
  limit: number;
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
