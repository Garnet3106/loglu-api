import { Controller, Headers, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from '@src/modules/users/users.service';
import { validateAuthState } from '@src/auth';
import { HttpError } from '@src/exceptions/exception';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(
    @Headers('authorization') bearerToken: string,
  ) {
    const idToken = await validateAuthState(bearerToken);
    if (!idToken.email) {
      throw new HttpError(HttpStatus.BAD_REQUEST, 'email is not set in firebase id token');
    }
    await this.userService.createUser(idToken.uid, idToken.email, idToken.email);
  }
}
