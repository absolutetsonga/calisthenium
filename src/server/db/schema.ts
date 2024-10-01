import { pgTableCreator, pgTable, serial, varchar, integer, timestamp, foreignKey } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `calisthenium_${name}`);

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  movementName: varchar("movement_name").notNull(),
  numberOfSets: integer("number_of_sets").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sets = pgTable("sets", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull(),
  numberOfReps: integer("number_of_reps").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    sessionIdFk: foreignKey({
      columns: [table.sessionId],
      foreignColumns: [sessions.id],
    }),
  };
});
