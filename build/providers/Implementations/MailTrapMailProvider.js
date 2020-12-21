"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailtrapMailProvider = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailtrapMailProvider {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: 'smtp.materdei.empresarial.ws',
            port: 587,
            auth: {
                user: 'contato@materdei.empresarial.ws',
                pass: 'xpjQDBTf!2'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }
    async sendMail(message) {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email,
            },
            from: {
                name: message.from.name,
                address: message.from.email,
            },
            subject: message.subject,
            html: message.body
        });
    }
}
exports.MailtrapMailProvider = MailtrapMailProvider;
