
import bcrypt from 'bcrypt'

// 1. Hashing a Password
export const hashPassword = async(password, confirmPassword) => {
    try {
        console.log("Password Type:", typeof password, "Password Value:", password);
        console.log("Confirm Password Type:", typeof confirmPassword, "Confirm Password Value:", confirmPassword);

        // Ensure both password and confirmPassword are non-empty strings
        if (typeof password !== 'string' || password.trim() === '') {
            throw new Error('Password must be a valid string');
        }

        if (typeof confirmPassword !== 'string' || confirmPassword.trim() === '') {
            throw new Error('Confirm Password must be a valid string');
        }

        // Ensure both passwords match before hashing
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const saltRounds = 10;
        
        // Generate the hashed password
        let hashedPassword = await bcrypt.hash(password, saltRounds);
        
        return hashedPassword;

    } catch (error) {
        console.log("Error hashing password:", error.message);
        throw error; // Rethrow the error to be handled in the calling function
    }
}

// 2. Comparing a hashed Password
export const comparingPassword = async(password, hashedPassword) => {
    // Ensure password is a string
    if (typeof password !== 'string') {
        throw new Error('Password must be a string');
    }

    return bcrypt.compare(password, hashedPassword);
}

