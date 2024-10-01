"use server";

import { db } from "..";
import { sessions } from "../schema";
import { and, eq } from "drizzle-orm";
import { AuthenticationService } from "../auth-checker";
import type { ICreateSession } from "~/lib/models";


class SessionService extends AuthenticationService {
  constructor() {
    super();
  }

  async getMySessions() {
    return await db.query.sessions.findMany({
      where: and(eq(sessions.userId, this.user.userId)),
    });
  }

  async createNewSession(session: ICreateSession) {
    const [newSession] = await db
      .insert(sessions)
      .values({
        ...session,
        userId: this.user.userId,
        createdAt: new Date(),
      })
      .returning();

    return newSession;
  }
}

const sessionService = new SessionService();

export const getMySessions = async () =>
    sessionService.getMySessions();
export const createNewSession = async (session: ICreateSession) =>
    sessionService.createNewSession(session);