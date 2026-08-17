import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const projects = pgTable("projects", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 100 }).notNull(),
    client: varchar("client", { length: 100 }).notNull(),
    description: text("description"),
    createdBy: text("created_by").notNull().references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date())
});