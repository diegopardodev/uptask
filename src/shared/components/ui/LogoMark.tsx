import Image from "next/image";
import Link from "next/link";

export default function LogoMark() {
    return (
        <Link href="/" aria-label="UpTask home">
            <Image
                src="/icon.svg"
                alt="UpTask"
                width={0}
                height={0}
                priority
                className="w-10 pointer-events-none mx-auto"
            />
        </Link>
    );
}
