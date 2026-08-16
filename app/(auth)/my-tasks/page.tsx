import { Metadata } from "next";
import Heading from "@/src/shared/components/typography/Heading";

export const metadata: Metadata = {
    title: "My tasks"
};

export default function MyTasksPage() {
    return (
        <>
            <Heading>My tasks</Heading>
            <Heading level={5}>Everything assigned to you, across every project.</Heading>
        </>
    );
}
