import clsx from "clsx";

type Props = {
    children: React.ReactNode;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
};

const sizeMap: Record<number, string> = {
    1: "text-3xl md:text-5xl font-bold",
    2: "text-xl md:text-3xl",
    3: "text-lg md:text-2xl",
    4: "text-md md:text-xl",
    5: "text-sm md:text-lg font-serif text-gray-500",
    6: "text-sm md:text-md font-serif"
};

export default function Heading({ level = 1, children, className }: Props) {
    const Tag: React.ElementType = `h${level}`;

    return (
        <Tag className={clsx(sizeMap[level], className)}>{children}</Tag>
    );
}
