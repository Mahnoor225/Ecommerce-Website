export const verifactionEmailTemplate = (NewUser, verifyCode) => {
    console.log("Received NewUser in the email template:", NewUser);
    console.log("Received verifyCode in the email template:", verifyCode);

    return `
        <h1>Hi ${NewUser.name},</h1>
        <h3>please verify your email address:</h3>
        <h1>Your verification code is ${verifyCode},</h1>  <!-- Just use verifyCode here -->
        <p>Click the link below to verify your email address:</p>
        <a href="http://localhost:5173/verify?code=${verifyCode}">Verify your email address</a>
    `;
};