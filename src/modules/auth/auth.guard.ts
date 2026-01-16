import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { getUser, verifyFirebaseIdToken } from '@src/auth';
import { HttpError } from '@src/exceptions/exception';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const bearerToken = request.headers.authorization;
    const decodedIdToken = await verifyFirebaseIdToken(bearerToken);
    if (!decodedIdToken) {
      throw new HttpError(HttpStatus.UNAUTHORIZED, 'firebase id token is invalid');
    }
    // Verify user existence
    await getUser(decodedIdToken.uid);
    return true;
  }
}
