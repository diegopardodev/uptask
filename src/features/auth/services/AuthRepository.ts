import { User } from "better-auth";
import { db } from "@/src/db";

export interface IAuthRepository {
    findByEmail(email: string): Promise<User | undefined>;
}

class AuthRepository implements IAuthRepository {
    async findByEmail(email: string): Promise<User | undefined> {
        return await db.query.users.findFirst({
            where: {
                email
            }
        });
    }
}

export const authRepository = new AuthRepository();