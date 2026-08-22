import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { projectService } from "@/src/features/projects/services/ProjectService";
import { ProjectPolicy } from "@/src/features/projects/policies/ProjectPolicy";
import Heading from "@/src/shared/components/typography/Heading";
import UnderlineHeading from "@/src/shared/components/typography/UnderlineHeading";
import Breadcrums from "@/src/shared/components/ui/Breadcrums";
import LinkButton from "@/src/shared/components/ui/LinkButton";
import DropdownMenu from "@/src/features/projects/components/DropdownMenu";
import { requireSession } from "@/src/shared/utils/auth-server";
import Tabs from "@/src/shared/components/ui/Tabs";
import { ProjectTabSearchParamsSchema } from "@/src/features/projects/schemas";
import Overview from "@/src/features/projects/components/Overview";
import Task from "@/src/features/tasks/components/Task";
import { taskService } from "@/src/features/tasks/service/taskService";

const getProjectForCurrentUser = cache(async (projectId: string) => {
    const session = await requireSession();
    const project = await projectService.getProject(projectId);

    if (!project || !ProjectPolicy.canView(session.user, project)) notFound();

    return project;
});

export async function generateMetadata(props: PageProps<"/projects/[id]">): Promise<Metadata> {
    const { id } = await props.params;
    const project = await getProjectForCurrentUser(id);

    return {
        title: `${project.name} project`,
    };
}

export default async function ProjectDetailPage(props: PageProps<"/projects/[id]">) {
    const { id } = await props.params;
    const session = await requireSession();
    const project = await getProjectForCurrentUser(id);

    const { tab } = ProjectTabSearchParamsSchema.parse(await props.searchParams);

    const tasks = tab === "tasks" ? await taskService.getProjectTasks(project.id) : [];

    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <Breadcrums labels={{ [project.id]: project.name }} />
            <div className="mt-10 flex flex-col justify-start md:flex-row md:justify-between md:items-start">
                <div>
                    <p className="uppercase font-medium text-xs text-gray-500 mb-3">{project.client}</p>
                    <UnderlineHeading title="" highlight={`${project.name}`}/>
                    { tab === "overview" && 
                        <Heading level={5} className="text-gray-500 mt-5 max-w-auto md:max-w-2xl">{project.description}</Heading>
                    }
                </div>

                {tab === "overview" && ProjectPolicy.canEdit(session.user, project) &&
                    <div className="mt-5 md:mt-0 flex items-center gap-3 w-full md:w-fit">
                        <LinkButton type="outline" href={`/projects/${project.id}/edit`} className="w-full md:w-fit text-center flex items-center gap-2 justify-center">
                            <PencilIcon className="text-primary-500 size-4" />
                            Edit project
                        </LinkButton>
                        <DropdownMenu project={project} />
                    </div>
                }
            </div>

            <Tabs tabs={[{ name: "Overview", value: "overview" }, { name: "Tasks", value: "tasks" }, { name: "Team", value: "team" }]} />

            {tab === "overview" && <Overview project={project} />}
            {tab === "tasks" && <Task tasks={tasks} canAddTask={ProjectPolicy.canAddTask(session.user, project)} />}
            {tab === "team" && <p>team</p>}  
        </div>
    );
}
