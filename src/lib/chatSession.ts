/**
 * Server-side chat session store.
 * Only the server records assistant turns — clients cannot forge prior model messages.
 */

export type ChatTurn = {
  role: "user" | "model";
  text: string;
};

type Session = {
  turns: ChatTurn[];
  updatedAt: number;
};

const sessions = new Map<string, Session>();

export const MAX_USER_MESSAGE_CHARS = 2000;
export const MAX_HISTORY_TURNS = 20; // user+model pairs counted as turns
export const SESSION_TTL_MS = 30 * 60 * 1000;

function pruneSessions(now: number) {
  for (const [id, session] of sessions) {
    if (now - session.updatedAt > SESSION_TTL_MS) {
      sessions.delete(id);
    }
  }
}

export function createSessionId(): string {
  return crypto.randomUUID();
}

export function getOrCreateSession(sessionId: string | null | undefined): { id: string; turns: ChatTurn[] } {
  const now = Date.now();
  pruneSessions(now);

  if (sessionId && sessions.has(sessionId)) {
    const session = sessions.get(sessionId)!;
    session.updatedAt = now;
    return { id: sessionId, turns: session.turns };
  }

  const id = createSessionId();
  sessions.set(id, { turns: [], updatedAt: now });
  return { id, turns: [] };
}

export function appendUserTurn(sessionId: string, text: string): ChatTurn[] {
  const session = sessions.get(sessionId);
  if (!session) {
    sessions.set(sessionId, { turns: [{ role: "user", text }], updatedAt: Date.now() });
    return sessions.get(sessionId)!.turns;
  }

  session.turns.push({ role: "user", text });
  // Keep last N turns
  if (session.turns.length > MAX_HISTORY_TURNS) {
    session.turns = session.turns.slice(-MAX_HISTORY_TURNS);
  }
  session.updatedAt = Date.now();
  return session.turns;
}

export function appendModelTurn(sessionId: string, text: string): void {
  const session = sessions.get(sessionId);
  if (!session) return;
  session.turns.push({ role: "model", text });
  if (session.turns.length > MAX_HISTORY_TURNS) {
    session.turns = session.turns.slice(-MAX_HISTORY_TURNS);
  }
  session.updatedAt = Date.now();
}

export function resetSession(sessionId: string): void {
  sessions.set(sessionId, { turns: [], updatedAt: Date.now() });
}

export function sanitizeUserMessage(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (trimmed.length > MAX_USER_MESSAGE_CHARS) {
    return trimmed.slice(0, MAX_USER_MESSAGE_CHARS);
  }
  return trimmed;
}
