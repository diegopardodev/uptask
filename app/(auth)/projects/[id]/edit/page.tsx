import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import EditProject from "@/src/features/projects/components/EditProject";
import { projectService } from "@/src/features/projects/services/ProjectService";
import Heading from "@/src/shared/components/typography/Heading";
import UnderlineHeading from "@/src/shared/components/typography/UnderlineHeading";
import LinkButton from "@/src/shared/components/ui/LinkButton";

export async function generateMetadata(props: PageProps<"/projects/[id]/edit">): Promise<Metadata> {
    const {id} = await props.params;
    const project = await projectService.getProject(id);
    if (!project) notFound();

    return {
        title: `Edit ${project.name} project`,
    };
}

export default async function EditProjectPage(props: PageProps<"/projects/[id]/edit">) {
    const { id } = await props.params;
    const project = await projectService.getProject(id);
    if (!project) notFound();

    return (
        <div className="max-w-3xl mx-auto w-full">
            <UnderlineHeading title="" highlight="Edit project"/>
            <Heading level={5} className="mt-3">Update the name, client or description. Changes apply right away.</Heading>
            <LinkButton type="outline" href={`/projects/${project.id}`} className="my-10 flex items-center justify-center gap-2">
                <ArrowLeftIcon className="size-4 text-primary-500" />
                Go back to project
            </LinkButton>

            <EditProject project={project} />
        </div>
    );
}
