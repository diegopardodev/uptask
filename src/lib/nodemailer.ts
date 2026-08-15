import nodemailer from "nodemailer";
import { env } from "./env";

type TransportConfig = {
    host: string;
    port: number;
    auth: {
        user: string;
        pass: string;
    }
}

const config = (): TransportConfig => {
    return {
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        auth: {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS
        }
    }
}

export const transporter = nodemailer.createTransport(config());