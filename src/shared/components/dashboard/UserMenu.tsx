"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { signOut } from "../../utils/auth-client";

export default function UserMenu() {
    const router = useRouter();

    return (
        <Menu as="div" className="relative ml-3">
            <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <Image
                    alt=""
                    width={0}
                    height={0}
                    src="/assets/avatar.svg"
                    className="size-8 rounded-full bg-gray-100 outline -outline-offset-1 outline-black/5"
                />
            </MenuButton>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                <MenuItem>
                    <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                        Profile
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                        Settings
                    </Link>
                </MenuItem>
                <MenuItem>
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
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 data-focus:bg-gray-100 data-focus:outline-hidden hover:cursor-pointer"
                    >
                        Sign out
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}
