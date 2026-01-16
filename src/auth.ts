import { auth } from '@src/firebase';
import { DecodedIdToken } from 'firebase-admin/auth';
import { HttpError } from './exceptions/exception';
import { HttpStatus } from '@nestjs/common';
import { User } from './users/user.dto';
import { prisma } from './prisma';

export async function getUserOptionally(fbUid: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { fbUid },
  });
}

export async function getUser(fbUid: string): Promise<User> {
  const user = await getUserOptionally(fbUid);
  if (!user) {
    throw new HttpError(HttpStatus.UNAUTHORIZED, 'user not found');
  }
  return user;
}

export async function validateAuthState(
  bearerToken?: string | null,
): Promise<DecodedIdToken> {
  const idToken = await verifyFirebaseIdToken(bearerToken);
  if (!idToken) {
    throw new HttpError(HttpStatus.UNAUTHORIZED, 'firebase id token is invalid');
  }
  return idToken;
}

export async function verifyFirebaseIdToken(
  bearerToken?: string | null,
): Promise<DecodedIdToken | null> {
  try {
    const prefix = 'Bearer ';
    if (!bearerToken || !bearerToken.startsWith(prefix)) {
      return null;
    }
    const idToken = bearerToken.split(prefix)[1];
    return await auth.verifyIdToken(idToken);
  } catch (error) {
    console.error(error);
    return null;
  }
}
