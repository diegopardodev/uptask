import { Metadata } from "next";
import Heading from "@/src/shared/components/typography/Heading";
import UnderlineHeading from "@/src/shared/components/typography/UnderlineHeading";

export const metadata: Metadata = {
    title: "My tasks"
};

export default function MyTasksPage() {
    return (
        <>
            <UnderlineHeading title="" highlight="My tasks" />
            <Heading level={5} className="mt-3">Everything assigned to you, across every project.</Heading>
        </>
    );
}
