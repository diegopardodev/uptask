import { Metadata } from "next";
import Link from "next/link";
import Heading from "@/src/shared/components/typography/Heading";
import UnderlineHeading from "@/src/shared/components/typography/UnderlineHeading";

export const metadata: Metadata = {
    title: "New project"
};

export default function NewProjectPage() {
    return (
        <div className="max-w-3xl mx-auto w-full">
            <UnderlineHeading title="" highlight="New project"/>
            <Heading level={5} className="mt-3">Give the project a name and a client, then start adding tasks.</Heading>
            <Link href="/projects" className="mt-5 block bg-white border border-primary-500 text-primary-500 w-fit py-2 px-5 font-semibold rounded-md hover:border-primary-600 hover:text-primary-600">Go back to projects</Link>
        </div>
    );
}
