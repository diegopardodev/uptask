"use client";

import Link from "next/link";
import UnderlineHeading from "@/src/shared/components/typography/UnderlineHeading";
import Logo from "@/src/shared/components/ui/Logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Error() {
    return (
        <>
            <div className="flex h-screen flex-col bg-white pt-16 pb-12">
                <main className="mx-auto flex w-full max-w-7xl grow flex-col justify-center px-6 lg:px-8">
                    <div className="flex max-w-60 mx-auto shrink-0 justify-center">
                        <Logo />
                    </div>
                    <div className="py-16">
                        <div className="text-center">
                            <p className="text-base font-semibold text-primary-500">500</p>
                            <UnderlineHeading title="There was an" highlight="error." />
                            <p className="mt-2 text-base text-gray-500">Sorry, something went wrong.</p>
                            <div className="mt-6">
                                <Link href="/" className="text-base font-medium text-primary-500 flex items-center justify-center gap-3">
                                    Go back home
                                    <span aria-hidden="true"> <ArrowRightIcon className="size-4 text-primary-500"/></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
