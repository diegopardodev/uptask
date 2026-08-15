import { transporter } from "@/src/lib/nodemailer";
import { EmailOptions } from "../types";

export class EmailService {
    static async send(options: EmailOptions): Promise<void> {
        try {
            const info = await transporter.sendMail(options);
            console.log(`Email sent: ${info.messageId}`);
        } catch (error) {
            console.error(error);
            throw new Error("We couldn't send that email. Try again in a few minutes.");
        }
    }
}