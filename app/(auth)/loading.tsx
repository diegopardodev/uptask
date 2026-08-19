import { Skeleton } from "@/src/shared/components/ui/Skeleton";

export default function Loading() {
    return (
        <div role="status" aria-label="Loading" className="w-full">
            <Skeleton aria-hidden="true" className="h-9 md:h-12 w-44 md:w-60" />
            <Skeleton aria-hidden="true" className="mt-3 h-5 md:h-7 w-64 md:w-88 max-w-full" />
        </div>
    );
}
