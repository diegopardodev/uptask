export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export function currentPath(href: string, pathname: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
}