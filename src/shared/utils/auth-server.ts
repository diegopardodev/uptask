import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";

export async function getSession() {
    return await auth.api.getSession({
        headers: await headers()
    });
}

export async function requireSession() {
    const session = await getSession();
    if (!session) redirect("/auth/sign-in");
    return session;
}