import { ButtonHTMLAttributes } from "react";
import { classNames } from "../../utils/ui";

type Variant = "destructive_outline" | "destructive" | "neutral";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    children: React.ReactNode
    className?: string;
};

export default function Button({variant = "destructive_outline", children, className, ...props}: Props) {
    const classes: Record<Variant, string> = {
        "destructive_outline": "bg-white border border-red-500 text-red-500 w-fit py-2 px-5 font-semibold rounded-md hover:border-red-600 hover:text-red-600 text-sm h-fit block hover:cursor-pointer",
        "destructive": "bg-red-500 text-white w-fit py-2 px-5 font-semibold rounded-md hover:bg-red-600 text-sm h-fit block hover:cursor-pointer",
        "neutral": "bg-gray-950/5 py-2 px-5 rounded-md text-sm font-medium hover:bg-gray-950/10 hover:cursor-pointer transition-colors ease-in-out duration-300"
    };

    return (
        <button {...props} className={classNames("whitespace-nowrap", classes[variant], className ? className : "")}>
            {children}
        </button>
    );
}
