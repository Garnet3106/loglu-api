import { Controller, Get, Headers } from '@nestjs/common';
import { validateAuthState } from '@src/auth';
import { getUser } from '@src/auth';
import { HashtagsService } from './hashtags.service';

@Controller('hashtags')
export class HashtagsController {
  constructor(private readonly hashtagService: HashtagsService) {}

  @Get()
  async find(
    @Headers('authorization') bearerToken: string,
  ) {
    const idToken = await validateAuthState(bearerToken);
    const user = await getUser(idToken.uid);
    return await this.hashtagService.find(user);
  }
}
