import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = Buffer.from(process.env.SESSION_SECRET as string, "utf-8"); // TODO: Check existence;

export type SessionData = {
  userId: string;
};

export async function createSession(payload: SessionData) {
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
}

export async function getSession() {
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
}

export async function deleteSession() {
  cookies().delete("if_session");
}
