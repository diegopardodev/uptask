import { Metadata } from "next";
import EmptyState from "@/src/shared/components/ui/EmptyState";
import Heading from "@/src/shared/components/typography/Heading";
import UnderlineHeading from "@/src/shared/components/typography/UnderlineHeading";

export const metadata: Metadata = {
    title: "Projects"
};

export default function ProjectsPage() {
    return (
        <>
            <UnderlineHeading title="" highlight="Projects" />
            <Heading level={5} className="mt-3">Every project you&apos;ve a member of.</Heading>
            <EmptyState />
        </>
    );
}
