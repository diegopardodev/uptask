import { createElement } from "react";
import { render } from "react-email";
import { config } from "../config";
import ConfirmEmail from "../templates/ConfirmEmail";
import ResetPasswordEmail from "../templates/ResetPasswordEmail";
import { EmailService } from "./EmailService";

export class AuthEmailService {
    static async sendConfirmEmail(email: string, url: string) {
        const html = await render(createElement(ConfirmEmail, { url }));

        await EmailService.send({
            from: config.from.accounts,
            to: email,
            subject: "Confirm your UpTask account",
            html,
            text: ConfirmEmail.text({ url })
        });
    }

    static async sendResetPasswordEmail(email: string, url: string) {
        const html = await render(createElement(ResetPasswordEmail, { url }));

        await EmailService.send({
            from: config.from.accounts,
            to: email,
            subject: "Reset your UpTask password",
            html,
            text: ResetPasswordEmail.text({ url })
        });
    }
}