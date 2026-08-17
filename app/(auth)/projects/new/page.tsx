import { Metadata } from "next";
import Heading from "@/src/shared/components/typography/Heading";
import UnderlineHeading from "@/src/shared/components/typography/UnderlineHeading";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import CreateProject from "@/src/features/projects/components/CreateProject";
import LinkButton from "@/src/shared/components/ui/LinkButton";

export const metadata: Metadata = {
    title: "New project"
};

export default async  function NewProjectPage() {
    return (
        <div className="max-w-3xl mx-auto w-full">
            <UnderlineHeading title="" highlight="New project"/>
            <Heading level={5} className="mt-3">Give the project a name and a client, then start adding tasks.</Heading>
            <LinkButton type="outline" href="/projects" className="my-10 flex items-center justify-center gap-2">
                <ArrowLeftIcon className="size-4 text-primary-500" />
                Go back to projects
            </LinkButton>

            <CreateProject />
        </div>
    );
}
