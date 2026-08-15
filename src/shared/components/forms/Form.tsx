import { FormHTMLAttributes } from "react";
import clsx from "clsx";

type Props = FormHTMLAttributes<HTMLFormElement>;

export default function Form(props: Props) {
    const { children, className } = props;

    return (
        <form {...props} className={clsx("space-y-5 w-full", className)}>
            {children}
        </form>
    );
}
