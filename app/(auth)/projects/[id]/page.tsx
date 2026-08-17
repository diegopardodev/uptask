import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PencilIcon } from "@heroicons/react/24/outline";
import { projectService } from "@/src/features/projects/services/ProjectService";
import Heading from "@/src/shared/components/typography/Heading";
import UnderlineHeading from "@/src/shared/components/typography/UnderlineHeading";
import Breadcrums from "@/src/shared/components/ui/Breadcrums";
import LinkButton from "@/src/shared/components/ui/LinkButton";
import DropdownMenu from "@/src/features/projects/components/DropdownMenu";

export async function generateMetadata(props: PageProps<"/projects/[id]">): Promise<Metadata> {
    const {id} = await props.params;
    const project = await projectService.getProject(id);
    if (!project) notFound();

    return {
        title: `${project.name} project`,
    };
}

export default async function ProjectDetailPage(props: PageProps<"/projects/[id]">) {
    const { id } = await props.params;
    const project = await projectService.getProject(id);
    if (!project) notFound();

    return (
        <>
            <Breadcrums labels={{ [project.id]: project.name }} />
            <div className="mt-10 flex flex-col justify-start md:flex-row md:justify-between md:items-start">
                <div>
                    <p className="uppercase font-medium text-xs text-gray-500 mb-3">{project.client}</p>
                    <UnderlineHeading title="" highlight={`${project.name}`}/>
                    <Heading level={5} className="text-gray-500 mt-5 max-w-auto md:max-w-2xl">{project.description}</Heading>
                </div>

                <div className="mt-5 md:mt-0 flex items-center gap-3 w-full md:w-fit">
                    <LinkButton type="outline" href={`/projects/${project.id}/edit`} className="w-full md:w-fit text-center flex items-center gap-2 justify-center">
                        <PencilIcon className="text-primary-500 size-4" />
                        Edit project
                    </LinkButton>
                    <DropdownMenu project={project} />
                </div>
            </div>
        </>
    );
}
