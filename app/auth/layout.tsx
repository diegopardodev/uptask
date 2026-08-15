export default function Layout({ children }: LayoutProps<"/auth">) {
    return (
        <main className="max-w-7xl mx-auto py-10 px-5 h-screen w-full">
            {children}
        </main>
    );
}
