import { createHash } from 'crypto';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import client from './client';

function convertTokenToHash(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

async function addToken(token: string): Promise<void> {
  const { exp } = jwt.decode(token) as JwtPayload;

  if (!exp) {
    throw new AppError('Token has no expiration date', 500);
  }

  const tokenHash = convertTokenToHash(token);

  await client.set(tokenHash, '');
  await client.expireAt(tokenHash, exp);
}

async function isTokenListed(token: string): Promise<boolean> {
  const tokenHash = convertTokenToHash(token);
  const isBlacklisted = await client.exists(tokenHash);

  return isBlacklisted === 1;
}

export default { addToken, isTokenListed };
