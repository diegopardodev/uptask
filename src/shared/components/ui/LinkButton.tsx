import { Route } from "next";
import Link from "next/link";
import clsx from "clsx";

type Props = {
    type?: "primary" | "outline";
    href: string;
    children: React.ReactNode
    className?: string;
};

export default function LinkButton({type = "primary", href, children, className}: Props) {
    const classes: Record<string, string> = {
        "primary": "rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-600 hover:cursor-pointer transition-colors ease-in-out duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 text-sm md:text-base h-fit w-fit",
        "outline": "bg-white border border-primary-500 text-primary-500 w-fit py-2 px-7 font-semibold rounded-md hover:border-primary-600 hover:text-primary-600 text-sm md:text-base h-fit",
    };

    return (
        <Link href={href as Route} className={clsx(classes[type], className)}>
            {children}
        </Link>
    );
}
