import { Metadata } from "next";
import EmptyState from "@/src/shared/components/ui/EmptyState";
import Heading from "@/src/shared/components/typography/Heading";

export const metadata: Metadata = {
    title: "Projects"
};

export default function ProjectsPage() {
    return (
        <>
            <Heading>Projects</Heading>
            <Heading level={5}>Every project you&apos;re a member of.</Heading>
            <EmptyState />
        </>
    );
}
