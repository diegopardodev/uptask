import { notFound } from "next/navigation";
import { projectService } from "@/src/features/projects/services/ProjectService";
import Heading from "@/src/shared/components/typography/Heading";
import UnderlineHeading from "@/src/shared/components/typography/UnderlineHeading";
import Breadcrums from "@/src/shared/components/ui/Breadcrums";

export default async function ProjectDetailPage(props: PageProps<"/projects/[id]">) {
    const { id } = await props.params;
    const project = await projectService.getProject(id);
    if (!project) notFound();

    return (
        <>
            <Breadcrums labels={{ [project.id]: project.name }} />
            <div className="mt-10">
                <p className="uppercase font-medium text-xs text-gray-500 mb-3">{project.client}</p>
                <UnderlineHeading title="" highlight={`${project.name}`}/>
                <Heading level={5} className="text-gray-500 mt-5">{project.description}</Heading>
            </div>
        </>
    );
}
