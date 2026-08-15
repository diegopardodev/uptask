import { createElement } from "react";
import { render } from "react-email";
import { config } from "../config";
import ConfirmEmail from "../templates/ConfirmEmail";
import { EmailService } from "./EmailService";

export class AuthEmailService {
    static async sendConfirmEmail(email: string, url: string) {
        const html = await render(createElement(ConfirmEmail, { url }));

        await EmailService.send({
            from: config.from.accounts,
            to: email,
            subject: "Confirm your UpTask email",
            html
        });
    }
}