import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/">
            <Image
                src="/logo.svg"
                alt="Uptask"
                width={0}
                height={0}
                priority
                className="w-80 md:w-100 pointer-events-none mx-auto"
            />
        </Link>
    );
}
