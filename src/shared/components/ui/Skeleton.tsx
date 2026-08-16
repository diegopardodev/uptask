import { classNames } from "../../utils/ui";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="skeleton"
            className={classNames("animate-pulse rounded-md bg-gray-200", className ? className : "")}
            {...props}
        />
    );
}

export { Skeleton };
