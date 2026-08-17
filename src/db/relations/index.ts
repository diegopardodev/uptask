import { defineRelations } from "drizzle-orm";
import * as schema from "../schema";

export const relations = defineRelations(schema, (r) => ({
        users: {
            sessions: r.many.sessions({
                from: r.users.id,
                to: r.sessions.userId,
            }),
            accounts: r.many.accounts({
                from: r.users.id,
                to: r.accounts.userId,
            }),
            projects: r.many.projects({
                from: r.users.id,
                to: r.projects.createdBy
            })
        },
        sessions: {
            user: r.one.users({
                from: r.sessions.userId,
                to: r.users.id,
            })
        },
        accounts: {
            user: r.one.users({
                from: r.accounts.userId,
                to: r.users.id,
            })
        },
        projects: {
            creator: r.one.users({
                from: r.projects.createdBy,
                to: r.users.id,
                optional: false
            }),
            tasks: r.many.tasks({
                from: r.projects.id,
                to: r.tasks.projectId
            })
        },
        tasks: {
            project: r.one.projects({
                from: r.tasks.projectId,
                to: r.projects.id
            })
        }
    })
);
