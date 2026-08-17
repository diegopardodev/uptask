import Image from "next/image";
import Heading from "./Heading";

type Props = {
    title: string;
    highlight: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
};

export default function UnderlineHeading({ title, highlight, level, className }: Props) {
    return (
        <Heading level={level} className={className}>
            {title}{" "}
            <span className="relative inline-block max-w-full">
                {highlight}
                <Image
                    src="/assets/underline.svg"
                    alt=""
                    aria-hidden
                    width={710}
                    height={25}
                    className="absolute bottom-[-0.17em] left-0 w-full h-[0.18em] pointer-events-none select-none"
                />
            </span>
        </Heading>
    );
}
