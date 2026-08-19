import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/src/lib/auth";

export const getSession = cache(async () => {
    return await auth.api.getSession({
        headers: await headers()
    });
});

export async function requireSession() {
    const session = await getSession();
    if (!session) redirect("/auth/sign-in");
    return session;
}