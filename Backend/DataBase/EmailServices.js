import http from 'http';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
// configure the SMTP transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // or 465 for secure connection
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});


// Function to send Email 
export const sendEmail = async (to, Subject, text, html, otp) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to:process.env.EMAIL,  // Make sure to send the correct recipient's email
            subject: Subject,
            text: `Your OTP for verification is: ${otp}`,  // Use otp here
            html: html,  // Use the passed html for the email body
        });
        return {
            status: true,
            message: 'Email sent successfully',
            data: info.messageId,
        };
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: 'Error sending email',
        };
    }
};
