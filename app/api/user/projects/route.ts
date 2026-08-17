import { ProjectIdSchema } from "@/src/features/projects/schemas";
import { projectService } from "@/src/features/projects/services/ProjectService";
import { getSession } from "@/src/shared/utils/auth-server";

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) return new Response(JSON.stringify([]), { status: 401 });

    const body = await request.json();
    const data = ProjectIdSchema.safeParse(body);

    if (!data.success) return Response.json({ errors: data.error.issues }, { status: 400 });

    await projectService.deleteProject(session.user.id, data.data.id);
    return Response.json({ ok: true }, { status: 200 });
}