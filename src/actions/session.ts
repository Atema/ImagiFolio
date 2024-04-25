import { getEnv } from "@/utils/environment/get-env";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = Buffer.from(getEnv("SESSION_SECRET"), "utf-8");

export type SessionData = {
  userId: string;
};

export const createSession = async (payload: SessionData) => {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);

  cookies().set("if_session", jwt, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
    sameSite: "lax",
    path: "/",
  });
};

export const getSession = async () => {
  const session = cookies().get("if_session")?.value;
  if (!session) return null;

  try {
    return (
      await jwtVerify<SessionData>(session, secretKey, {
        algorithms: ["HS256"],
      })
    ).payload;
  } catch (_) {
    return null;
  }
};

export const deleteSession = async () => {
  cookies().delete("if_session");
};
