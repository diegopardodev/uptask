import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" aria-label="UpTask home">
            <span className="sr-only">UpTask</span>
            <Image
                src="/logo.svg"
                alt="UpTask"
                width={0}
                height={0}
                priority
                className="w-80 md:w-100 pointer-events-none mx-auto"
            />
        </Link>
    );
}
