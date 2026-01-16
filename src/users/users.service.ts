import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.dto';
import { prisma } from '@src/prisma';
import { HttpError } from '@src/exceptions/exception';

@Injectable()
export class UsersService {
  async createUser(fbUid: string, email: string, name: string): Promise<User> {
    const existingUser = await prisma.user.findUnique({
      where: { fbUid },
    });
    if (existingUser) {
      throw new HttpError(HttpStatus.BAD_REQUEST, 'user already exists');
    }
    return prisma.user.create({
      data: { fbUid, email, name },
    });
  }
}
