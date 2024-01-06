import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

export const emailRegister = async (name: string, email: string, token: string) => {
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "5b74b7885a56e6",
            pass: "9c90b434402730"
        }
    });

    //information to send email
    const info = await transport.sendMail({
        from: '"Uptask" <uptask@mailtrap.com>',  
        to: email,
        subject: "Account confirmation",
        text: "Confirm your account",
        html: `
        <div>
            <h1>Confirm your account</h1>
            <p>Hi ${name}</p>
            <p>Click in the link below to confirm your account</p>
            <a href="${process.env.FRONTEND_URL!}/confirm-account/${token}">Confirm my account</a>
            <p>If you did not create this account, please ignore this email</p>
        </div>
        `
    });
}