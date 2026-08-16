import Link from "next/link";
import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LogoMark from "@/src/shared/components/ui/LogoMark";
import MobileUserMenu from "@/src/shared/components/dashboard/MobileUserMenu";
import UserMenu from "@/src/shared/components/dashboard/UserMenu";
import NotificationsPanel from "@/src/shared/components/dashboard/NotificationsPanel";

export default async function Layout({children}: LayoutProps<"/">) {
    return (
        <>
            <Disclosure
                as="nav"
                className="relative bg-white shadow-sm"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <LogoMark />
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center border-b-2 border-primary-500 px-1 pt-1 text-sm font-medium text-gray-900"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="#"
                                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                >
                                    Projects
                                </Link>
                                <Link
                                    href="#"
                                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                >
                                    My tasks
                                </Link>
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <NotificationsPanel />
                            <UserMenu />
                        </div>
                        <div className="-mr-2 flex items-center sm:hidden">
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-2 focus:-outline-offset-1 focus:outline-primary-500">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                            </DisclosureButton>
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 pt-2 pb-3">
                        <Link
                            href="/dashboard"
                            className="block border-l-4 border-primary-500 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-primary-600"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="#"
                            className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                        >
                            Projects
                        </Link>
                        <Link
                            href="#"
                            className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                        >
                            My tasks
                        </Link>
                    </div>
                    <div className="border-t border-gray-200 pt-4 pb-3">
                        <div className="flex items-center px-4">
                            <div className="shrink-0">
                                <Image
                                    alt=""
                                    width={0}
                                    height={0}
                                    src="/assets/avatar.svg"
                                    className="size-10 rounded-full bg-gray-100 outline -outline-offset-1 outline-black/5"
                                />
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-gray-800">Diego Pardo</div>
                                <div className="text-sm font-medium text-gray-500">engineer.pardo@gmail.com</div>
                            </div>
                            <NotificationsPanel />
                        </div>
                        <MobileUserMenu />
                    </div>
                </DisclosurePanel>
            </Disclosure>

            <main className="max-w-7xl mx-auto px-5 py-10 w-full">
                {children}
            </main>
        </>
    );
}
