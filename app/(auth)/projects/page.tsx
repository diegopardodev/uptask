import { Metadata } from "next";
import { PlusIcon } from "@heroicons/react/24/outline";
import EmptyState from "@/src/shared/components/ui/EmptyState";
import Heading from "@/src/shared/components/typography/Heading";
import UnderlineHeading from "@/src/shared/components/typography/UnderlineHeading";
import { requireSession } from "@/src/shared/utils/auth-server";
import { projectService } from "@/src/features/projects/services/ProjectService";
import ProjectCard from "@/src/features/projects/components/ProjectCard";
import LinkButton from "@/src/shared/components/ui/LinkButton";

export const metadata: Metadata = {
    title: "Projects"
};

export default async function ProjectsPage() {
    const session = await requireSession();
    const projects = await projectService.getAllProjects(session.user.id);

    return (
        <>
            <div className="flex justify-between items-end">
                <div>
                    <UnderlineHeading title="" highlight="Projects" />
                    <Heading level={5} className="mt-3">Every project you&apos;ve a member of.</Heading>
                </div>
                
                {projects.length && 
                    <LinkButton href="/projects/new" className="flex items-center gap-2">
                        <PlusIcon className="size-4" />
                        New project
                    </LinkButton>
                }
                
            </div>

            {projects.length ? (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 mt-10">
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </section>
            ) : <EmptyState />}
        </>
    );
}
