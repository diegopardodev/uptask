import { requireSession } from "@/src/shared/utils/auth-server";

export default async function Template({children}: Readonly<{ children: React.ReactNode }>) {
    await requireSession();
    return children;
}
