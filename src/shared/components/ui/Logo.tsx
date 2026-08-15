import Image from "next/image";

export default function Logo() {
    return (
        <Image
            src="/logo.svg"
            alt="Uptask Logo"
            width={0}
            height={0}
            priority
            className="size-auto md:w-100 pointer-events-none mx-auto"
        />
    );
}
