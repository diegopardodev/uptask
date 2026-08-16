import { Skeleton } from "@/src/shared/components/ui/Skeleton";

export default function Loading() {
    return (
        <div role="status" aria-label="Loading" className="w-full">
            <Skeleton aria-hidden="true" className="h-9 md:h-12 w-32 md:w-48" />
            <Skeleton aria-hidden="true" className="mt-2 h-5 md:h-7 w-52 md:w-72 max-w-full" />

            <div
                aria-hidden="true"
                className="mt-10 md:mt-20 text-center border-2 border-dashed border-gray-300 py-10 px-5 rounded-md"
            >
                <Skeleton className="mx-auto size-12" />
                <Skeleton className="mx-auto mt-2 h-5 w-32 max-w-full" />
                <Skeleton className="mx-auto mt-1 h-5 w-72 max-w-full" />
                <Skeleton className="mx-auto mt-6 h-9 w-40 max-w-full" />
            </div>
        </div>
    );
}
