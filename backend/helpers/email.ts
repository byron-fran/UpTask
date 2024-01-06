import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

export const emailRegister = async (name: string, email: string, token: string) => {
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: Number(process.env.PORT_NODEMAILER!),
        auth: {
            user: process.env.USER_URL!,
            pass: process.env.PASSWORD_URL!,
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
};

// reset password
export const resetPasswordEmail = async (name: string, email: string, token: string) => {
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: Number(process.env.PORT_NODEMAILER!),
        auth: {
            user: process.env.USER_URL!,
            pass: process.env.PASSWORD_URL!,
        }
    });

    //information to send email
    const info = await transport.sendMail({
        from: '"Uptask" <uptask@mailtrap.com>',  
        to: email,
        subject: "set new password",
        text: "reset your password",
        html: `
        <div>
            <h1>set new password for your account</h1>
            <p>Hi ${name}</p>
            <p>Click in the link below to reset your password</p>
            <a href="${process.env.FRONTEND_URL!}/new-password/${token}">Confirm my account</a>
            <p> if you did not request this change, please ignore this email</p>
        </div>
        `
    });
}