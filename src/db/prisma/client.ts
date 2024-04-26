import { PrismaClient } from "./generated";

declare global {
  // eslint-disable-next-line no-var
  var __dev_prisma: PrismaClient;
}

const prisma = globalThis.__dev_prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.__dev_prisma = prisma;

export default prisma;
