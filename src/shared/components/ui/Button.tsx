import { ButtonHTMLAttributes } from "react";
import { classNames } from "../../utils/ui";

type Variant = "destructive_outline" | "destructive" | "neutral" | "destructive_menu" | "primary";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    children: React.ReactNode
    className?: string;
};

export default function Button({variant = "destructive_outline", children, className, ...props}: Props) {
    const classes: Record<Variant, string> = {
        "destructive_outline": "bg-white border border-red-500 text-red-500 w-fit py-2 px-5 font-semibold rounded-md hover:border-red-600 hover:text-red-600 text-sm h-fit block hover:cursor-pointer",
        "destructive": "bg-red-500 text-white w-fit py-2 px-5 font-semibold rounded-md hover:bg-red-600 text-sm h-fit block hover:cursor-pointer",
        "neutral": "bg-gray-950/5 py-2 px-5 rounded-md text-sm font-medium hover:bg-gray-950/10 hover:cursor-pointer transition-colors ease-in-out duration-300",
        "destructive_menu": "w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:cursor-pointer",
        "primary": "rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-600 hover:cursor-pointer transition-colors ease-in-out duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 text-sm md:text-base h-fit block"
    };

    return (
        <button {...props} className={classNames("whitespace-nowrap", classes[variant], className ? className : "")}>
            {children}
        </button>
    );
}
