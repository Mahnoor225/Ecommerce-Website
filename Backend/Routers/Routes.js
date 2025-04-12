import express from 'express'
import { EmailVerification, loginController,  RegisterController, removeImageController, resendOtp, resetForgetPassword, sendForgetPasswordOtp, updateUserController, useAvatarController, verifyForgetPasswordOtp } from '../Controller/newSignupController.js'
import { requireSignIn } from '../Middleware/authMiddleware.js'
import upload from '../Middleware/multer.js'


let Route = express.Router()


Route.post("/newRegister", RegisterController)
Route.post("/emailVerification", EmailVerification)
Route.post("/resend",resendOtp)
Route.post("/login", loginController);
// Route for uploading user avatar
Route.put("/user_Avatar", requireSignIn, upload.array("avatar"), useAvatarController);
Route.delete("/deleteimage", requireSignIn, removeImageController);

Route.put("/update/:id", requireSignIn, updateUserController);
Route.post("/forgetPassword", sendForgetPasswordOtp);
Route.post("/verify-ForgetPassword",  verifyForgetPasswordOtp);
Route.post("/reset-ForgetPassword",  resetForgetPassword);
export default Route