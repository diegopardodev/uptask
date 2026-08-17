import Heading from "@/src/shared/components/typography/Heading";
import UnderlineHeading from "@/src/shared/components/typography/UnderlineHeading";

export default async function Home() {
  return (
    <>
      <UnderlineHeading title="" highlight="Dashboard" />
      <Heading level={5} className="mt-3">What&apos;s moving across your projects today.</Heading>
    </>
  );
}
