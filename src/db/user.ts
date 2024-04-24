import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import prisma from "./prisma/client";
const scrypt = promisify(scryptCb);

/**
 * Hash a password for database storage using scrypt
 * @param password User-provided password
 * @param salt Optional salt from a stored hash
 * @returns Hash in binary format, containing 1-byte version number, salt and hash
 */
export async function hashPassword(password: string, salt?: Buffer) {
  if (!salt) salt = randomBytes(16);
  const hash = (await scrypt(password, salt, 64)) as Buffer;
  return Buffer.concat([Buffer.from([0]), salt, hash]);
}

/**
 * Check a given password against the database-stored password hash
 * @param password User-provided password
 * @param storedHash Stored hash (generated by {@link hashPassword})
 * @returns Whether the stored hash matches the password
 */
export async function checkPasswordHash(password: string, storedHash: Buffer) {
  const storedSalt = storedHash.subarray(1, 17);
  const calculatedHash = await hashPassword(password, storedSalt);
  return timingSafeEqual(storedHash, calculatedHash);
}

export async function checkUserLogin(email: string, password: string) {
  const user = await prisma.user.findUnique({
    select: { id: true, password: true },
    where: { email },
  });

  if (!(user && (await checkPasswordHash(password, user.password))))
    return null;

  return user.id;
}

export async function createUser(
  email: string,
  displayName: string,
  password: string
) {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        displayName,
        password: await hashPassword(password),
      },
      select: { id: true, password: true },
    });

    return user.id;
  } catch (err) {
    return null;
  }
}

export async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: { displayName: true },
  });
}
