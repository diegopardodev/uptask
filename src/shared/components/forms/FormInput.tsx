import { InputHTMLAttributes } from "react";
import clsx from "clsx";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    error: boolean;
};

export default function FormInput({ className, error, ...props }: Props) {
    return (
        <>
            <div className="grid grid-cols-1">
                <input
                    {...props}
                    aria-invalid={error}
                    aria-describedby={error ? "email-error" : "email"}
                    className={clsx("col-start-1 row-start-1 block w-full rounded-md bg-white py-2 pr-10 pl-3 sm:pr-9 text-sm", error ? "text-red-900 outline-1 -outline-offset-1 outline-red-500 placeholder:text-red-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600" : "outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary", className)}
                />
                { error && <ExclamationCircleIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
                /> }
                
            </div>
        </>
    );
}
