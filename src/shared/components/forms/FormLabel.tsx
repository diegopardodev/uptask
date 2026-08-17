import clsx from "clsx";
import { LabelHTMLAttributes } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement>;

export function FormLabel(props: Props) {
    const { children, className } = props;

    return (
        <label {...props} className={clsx("text-sm md:text-base block", className)}>{children}</label>
    );
}
