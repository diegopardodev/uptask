import { User } from "better-auth";
import { projects } from "@/src/db/schema";

export type SelectProject = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;
export type SelectProjectWithManager = SelectProject & { manager: User };