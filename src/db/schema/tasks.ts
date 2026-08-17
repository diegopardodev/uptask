import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { projects } from "./projects";

export const taskStatus = pgEnum("task_status", [
    "PENDING",
    "ON_HOLD",
    "IN_PROGRESS",
    "UNDER_REVIEW",
    "COMPLETED"
]);

export const tasks = pgTable("tasks", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    status: taskStatus("status").notNull().default("PENDING"),
    projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});