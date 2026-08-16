import { Metadata } from "next";
import Link from "next/link";
import NewProjectForm from "@/src/features/projects/components/NewProjectForm";
import Heading from "@/src/shared/components/typography/Heading";

export const metadata: Metadata = {
    title: "New project"
};

export default function NewProjectPage() {
    return (
        <div className="max-w-3xl mx-auto w-full">
            <Heading>New project</Heading>
            <Heading level={5}>Give the project a name and a client, then start adding tasks.</Heading>
            <Link href="/projects" className="mt-5 block bg-white border border-primary-500 text-primary-500 w-fit py-2 px-5 font-semibold rounded-md hover:border-primary-600 hover:text-primary-600">Go back to projects</Link>
            <NewProjectForm />
        </div>
    );
}
