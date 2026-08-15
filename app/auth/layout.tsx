import Logo from "@/src/shared/components/ui/Logo";

export default function Layout({ children }: LayoutProps<"/auth">) {
    return (
        <main className="max-w-7xl mx-auto py-10 px-5 h-screen w-full flex flex-col justify-center">
            <Logo />
            {children}
        </main>
    );
}
