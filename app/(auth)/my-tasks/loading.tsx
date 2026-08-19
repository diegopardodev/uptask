import { Skeleton } from "@/src/shared/components/ui/Skeleton";

export default function Loading() {
    return (
        <div role="status" aria-label="Loading" className="w-full">
            <Skeleton aria-hidden="true" className="h-9 md:h-12 w-36 md:w-52" />
            <Skeleton aria-hidden="true" className="mt-3 h-5 md:h-7 w-72 md:w-96 max-w-full" />
        </div>
    );
}
