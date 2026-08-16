import Image from "next/image";
import { redirect } from "next/navigation";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LogoMark from "@/src/shared/components/ui/LogoMark";
import MobileUserMenu from "@/src/shared/components/dashboard/MobileUserMenu";
import UserMenu from "@/src/shared/components/dashboard/UserMenu";
import NotificationsPanel from "@/src/shared/components/dashboard/NotificationsPanel";
import Navigation from "@/src/shared/components/dashboard/Navigation";
import MobileNavigation from "@/src/shared/components/dashboard/MobileNavigation";
import { getSession } from "@/src/shared/utils/auth-server";

export default async function Layout({children}: LayoutProps<"/">) {
    const session = await getSession();
    if (!session) redirect("/auth/sign-in");

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
                            <Navigation />
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
                    <MobileNavigation />
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
                                <div className="text-base font-medium text-gray-800">{session.user.name}</div>
                                <div className="text-sm font-medium text-gray-500">{session.user.email}</div>
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
