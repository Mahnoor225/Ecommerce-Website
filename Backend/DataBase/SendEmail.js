import { sendEmail } from "./EmailServices.js";
export const sendEmailFun = async (to, subject, text, html, otp, name) => {
    try {
        // Call sendEmail function
        const result = await sendEmail(to, subject, text, html, otp, name);
        
        // Log the entire result to verify what's coming back
        console.log('Email send result:', result);

        // Check if the result has status === true
        if (result.status) {
            console.log('Email sent successfully:', result.message);
            return true;
        } else {
            console.log('Error sending email:', result.message);
            return false;
        }
    } catch (error) {
        // Catch any unexpected errors and log them
        console.error('Error in sendEmailFun:', error);
        return false;
    }
};
