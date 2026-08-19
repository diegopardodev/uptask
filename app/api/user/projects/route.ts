import { ProjectIdSchema } from "@/src/features/projects/schemas";
import { projectService } from "@/src/features/projects/services/ProjectService";
import { getSession } from "@/src/shared/utils/auth-server";

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const data = ProjectIdSchema.safeParse(body);

    if (!data.success) return Response.json({ errors: data.error.issues }, { status: 400 });

    const deleted = await projectService.deleteProject(session.user.id, data.data.id);
    if (!deleted) return Response.json({ error: "Project not found" }, { status: 404 });

    return Response.json({ ok: true }, { status: 200 });
}
