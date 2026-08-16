import { redirect } from "next/navigation";
import { getSession } from "@/src/shared/utils/auth-server";

export default async function Template({children}: Readonly<{ children: React.ReactNode }>) {
    const session = await getSession();
    if (!session) redirect("/auth/sign-in");
    return children;
}
