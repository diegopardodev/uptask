import nodemailer from "nodemailer";

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
        host: process.env.SMTP_HOST!,
        port: +process.env.SMTP_PORT!,
        auth: {
            user: process.env.SMTP_USER!,
            pass: process.env.SMTP_PASS!
        }
    }
}

export const transporter = nodemailer.createTransport(config());