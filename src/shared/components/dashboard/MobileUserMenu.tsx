"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "../../utils/auth-client";

export default function MobileUserMenu() {
    const router = useRouter();

    return (
        <div className="mt-3 space-y-1">
            <Link
                href="#"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
                Profile
            </Link>
            <Link
                href="#"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
                Settings
            </Link>
            <button
                onClick={async () => {
                    await signOut({
                        fetchOptions: {
                            onSuccess: () => {
                                router.push("/auth/sign-in");
                            }
                        }
                    });
                }}
                className="block text-left w-full hover:cursor-pointer px-4 py-2 text-base font-medium text-red-500 hover:bg-gray-100"
            >
                Sign out
            </button>
        </div>
    );
}
