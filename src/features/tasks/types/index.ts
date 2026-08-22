import { tasks, taskStatus } from "@/src/db/schema";

export type SelectTask = typeof tasks.$inferSelect;
export type InsertTask = typeof tasks.$inferInsert;

export type TaskStatus = typeof taskStatus.enumValues[number];
export type TasksByStatus = Record<TaskStatus, SelectTask[]>;