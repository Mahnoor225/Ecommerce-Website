import express from 'express'
import { EmailVerification, loginController, logout, RegisterController } from '../Controller/newSignupController.js'
import { requireSignIn } from '../Middleware/authMiddleware.js'


let Route = express.Router()


Route.post("/newRegister", RegisterController)
Route.post("/emailVerification", EmailVerification)
Route.post("/login", loginController)
Route.get("/logout", requireSignIn, logout)

// newsignuproute.post("/login", loginController)
// newsignuproute.get("/test", requireSignIn, dummyController)
// // newsignuproute.get("/test", dummyController)
// newsignuproute.get("/loginGetAllData", getAllUsersController)
// newsignuproute.put("/loginGetAllData/:id", updateUserController)
// newsignuproute.delete("/deleteUser/:id", deleteUserController)


export default Route