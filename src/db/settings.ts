import { z } from "zod";
import prisma from "./prisma/client";

const getValue = async (key: string) =>
  (await prisma.settings.findUnique({ where: { key } }))?.value;

const setValue = async (key: string, value: string) =>
  await prisma.settings.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

const defaultRoleKey = "default-role";
const defaultRoleSchema = z
  .enum(["admin", "editor", "viewer"])
  .default("editor");
export type DefaultRole = z.output<typeof defaultRoleSchema>;

export const getDefaultRole = async () =>
  defaultRoleSchema.parse(await getValue(defaultRoleKey));

export const setDefaultRole = async (value: DefaultRole) => {
  await setValue(defaultRoleKey, defaultRoleSchema.parse(value));
};
