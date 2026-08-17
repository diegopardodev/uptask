import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 100 }).notNull(),
    client: varchar("client", { length: 100 }).notNull(),
    description: text("description"),
    createdBy: text("created_by").notNull(),
    createdAt: timestamp("created_at").defaultNow()
});