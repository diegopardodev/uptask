import Heading from "@/src/shared/components/typography/Heading";
import Logo from "@/src/shared/components/ui/Logo";

export default function SignUpPage() {
    return (
        <>
            <Logo />
            
            <div className="mt-10 space-y-2">
                <Heading>Create an account</Heading>
                <Heading level={5}>Start planning you team's work in minutes</Heading>
            </div>
        </>
    );
}
