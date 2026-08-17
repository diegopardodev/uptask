import Link from "next/link";
import UnderlineHeading from "@/src/shared/components/typography/UnderlineHeading";
import Logo from "@/src/shared/components/ui/Logo";

export default function NotFound() {
    return (
        <>
            <section className="flex min-h-[calc(100dvh-9rem)] flex-col justify-center bg-white">
                <div className="mx-auto flex w-full max-w-7xl grow flex-col justify-center px-6 lg:px-8">
                    <div className="flex max-w-60 mx-auto shrink-0 justify-center">
                        <Logo />
                    </div>
                    <div className="py-16">
                        <div className="text-center">
                            <p className="text-base font-semibold text-primary-500">404</p>
                            <UnderlineHeading title="Project not" highlight="found." />
                            <p className="mt-2 text-base text-gray-500">It may have been deleted, or you may have lost access.</p>
                            <div className="mt-6">
                                <Link href="/projects" className="text-base font-medium text-primary-500">
                                    Go back to projects
                                    <span aria-hidden="true"> &rarr;</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
