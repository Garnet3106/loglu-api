import { Body, Controller, Get, Headers, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateBookmarkDto, FindBookmarkDto, UpdateBookmarkDto } from './bookmarks.dto';
import { getUser, validateAuthState } from '@src/auth';
import { BookmarksService } from './bookmarks.service';

@Controller('bookmarks')
@UseGuards(AuthGuard)
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Get()
  async find(
    @Headers('authorization') bearerToken: string,
    @Body() dto: FindBookmarkDto,
  ) {
    const idToken = await validateAuthState(bearerToken);
    const user = await getUser(idToken.uid);
    return await this.bookmarksService.find(dto, user);
  }

  @Post()
  async create(
    @Headers('authorization') bearerToken: string,
    @Body() dto: CreateBookmarkDto,
  ) {
    const idToken = await validateAuthState(bearerToken);
    const user = await getUser(idToken.uid);
    return await this.bookmarksService.create(dto, user);
  }

  @Patch()
  async update(
    @Headers('authorization') bearerToken: string,
    @Body() dto: UpdateBookmarkDto,
  ) {
    const idToken = await validateAuthState(bearerToken);
    const user = await getUser(idToken.uid);
    return await this.bookmarksService.update(dto, user);
  }
}
