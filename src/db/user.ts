import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import prisma from "./prisma/client";
import { User } from "./prisma/generated";
import { getDefaultRole } from "./settings";
const scrypt = promisify(scryptCb);

/**
 * Hash a password for database storage using scrypt
 *
 * @param password - User-provided password
 * @param salt - Optional salt from a stored hash
 * @returns Hash in binary format, containing 1-byte version number, salt and
 * hash
 */
export const hashPassword = async (password: string, salt?: Buffer) => {
  if (!salt) salt = randomBytes(16);
  const hash = (await scrypt(password, salt, 64)) as Buffer;
  return Buffer.concat([Buffer.from([0]), salt, hash]);
};

/**
 * Check a given password against the database-stored password hash
 *
 * @param password - User-provided password
 * @param storedHash - Stored hash (generated by {@link hashPassword})
 * @returns Whether the stored hash matches the password
 */
export const checkPasswordHash = async (password: string, storedHash: Buffer) =>
  timingSafeEqual(
    storedHash,
    await hashPassword(password, storedHash.subarray(1, 17)),
  );

/**
 * Updates the information of a user
 *
 * @param id - Id of the user to update
 * @param data - Updated information of the user
 * @returns Whether the update was successful
 */
export const updateUser = async (
  id: string,
  data: Partial<Omit<User, "id">>,
) => {
  const user = await prisma.user.update({
    where: { id },
    select: { id: true },
    data,
  });

  return !!user;
};

/**
 * Checks whether a user-provided password is correct
 *
 * @param id - User's id
 * @param password - User-provided password
 * @returns Whether the check was successful
 */
export const checkUserPassword = async (id: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { password: true },
  });

  if (!user || !(await checkPasswordHash(password, user.password)))
    return false;

  return true;
};

/**
 * Updates the password of a user
 *
 * @param id - The user's id
 * @param password - The new password of the user, in text
 * @returns Whether the update was successful
 */
export const updateUserPassword = async (id: string, password: string) => {
  const hash = await hashPassword(password);

  return await updateUser(id, { password: hash });
};

/**
 * Checks whether a user-provided login is correct
 *
 * @param email - User-provided email address
 * @param password - User-provided password
 * @returns User-id if the check was successful
 */
export const checkUserLogin = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    select: { id: true, password: true },
    where: { email },
  });

  if (!(user && (await checkPasswordHash(password, user.password))))
    return null;

  return user.id;
};

/**
 * Creates a new user in the database
 *
 * @param email - Email address of the user
 * @param displayName - Display name of the user
 * @param password - Password (plain text) of the user
 * @returns User-id if the creation was successful
 */
export const createUser = async (
  email: string,
  displayName: string,
  password: string,
) => {
  const userCount = await prisma.user.count();
  const defaultRole = await getDefaultRole();

  try {
    const user = await prisma.user.create({
      data: {
        email,
        displayName,
        password: await hashPassword(password),
        role: userCount === 0 ? "admin" : defaultRole,
      },
      select: { id: true, password: true },
    });

    return user.id;
  } catch (err) {
    return null;
  }
};

/**
 * Retrieves a user from the database
 *
 * @param id - Id of the user to retrieve
 * @returns User object corresponding to the id
 */
export const getUser = async (id: string) =>
  await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, displayName: true, role: true },
  });

/**
 * Retrieves all users from the database
 *
 * @returns A list of user objects
 */
export const getUsers = async () =>
  await prisma.user.findMany({
    select: { id: true, email: true, displayName: true, role: true },
    orderBy: { displayName: "asc" },
  });
