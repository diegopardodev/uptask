import { Skeleton } from "@/src/shared/components/ui/Skeleton";

export default function Loading() {
    return (
        <div role="status" aria-label="Loading" className="max-w-3xl mx-auto w-full">
            <Skeleton aria-hidden="true" className="h-9 md:h-12 w-44 md:w-72 max-w-full" />
            <Skeleton aria-hidden="true" className="mt-3 h-5 md:h-7 w-full max-w-lg" />
            <Skeleton aria-hidden="true" className="my-10 h-9.5 md:h-10.5 w-52 md:w-56 max-w-full" />

            <div aria-hidden="true" className="space-y-5">
                <div className="space-y-2">
                    <Skeleton className="h-5 md:h-6 w-12" />
                    <Skeleton className="h-9 w-full" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-5 md:h-6 w-14" />
                    <Skeleton className="h-9 w-full" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-5 md:h-6 w-40 max-w-full" />
                    <Skeleton className="h-44 w-full" />
                </div>

                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    );
}
