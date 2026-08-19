import { Skeleton } from "@/src/shared/components/ui/Skeleton";
import { PROJECTS_PER_PAGE } from "@/src/features/projects/constants";

function ProjectCardSkeleton() {
    return (
        <div className="rounded-md border border-gray-200 w-full p-5 flex flex-col justify-between min-h-50">
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-5 w-40 max-w-full" />
                </div>
                <Skeleton className="h-6.5 w-26 shrink-0 rounded-full" />
            </div>

            <div className="space-y-2">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-2/3" />
            </div>

            <div className="flex justify-between items-center">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-3.5 w-24" />
            </div>
        </div>
    );
}

export default function Loading() {
    return (
        <div role="status" aria-label="Loading" className="w-full">
            <div aria-hidden="true" className="flex justify-between items-end">
                <div>
                    <Skeleton className="h-9 md:h-12 w-36 md:w-48" />
                    <Skeleton className="mt-3 h-5 md:h-7 w-56 md:w-80 max-w-full" />
                </div>

                <Skeleton className="h-9.5 md:h-10.5 w-32 md:w-37 shrink-0" />
            </div>

            <div
                aria-hidden="true"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 mt-10"
            >
                {Array.from({ length: PROJECTS_PER_PAGE }).map((_, index) => (
                    <ProjectCardSkeleton key={index} />
                ))}
            </div>

            <div aria-hidden="true" className="mt-10 flex items-center justify-center gap-1">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="size-9" />
                ))}
            </div>
        </div>
    );
}
