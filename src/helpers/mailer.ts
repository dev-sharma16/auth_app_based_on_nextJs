// this is simpler way to get data from usr useing url params but do this when you doing this on backend or serverside
// domain.com/verify/assfddghsfhj

// this is way to get data from url using " window.location.search " this when you doing this on frontend or clientside
// domain.com/verify?token=sdifkdfjjsd

import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {
        // created hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transport = nodemailer.createTransport({
           host: "sandbox.smtp.mailtrap.io",
           port: 2525,
           auth: {
             user: process.env.MAIL_USER,
             pass: process.env.MAIL_PASS
           }
        });

        const mailOptions = {
            from: 'dev@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href = "${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a>to ${emailType === "VERIFY" ? "Verify your Email": "Reset your Password"}
              or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/verifyEmail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}
