import Link from "next/link";
import { BellIcon } from "@heroicons/react/24/outline";

export default function NotificationsPanel() {
    return (
        <Link
            href="#"
            className="relative ml-auto shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-primary-500"
        >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" className="size-6" />
        </Link>
    );
}
