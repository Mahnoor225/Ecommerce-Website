import JWT from 'jsonwebtoken'
import express from 'express'

export const requireSignIn = async (req, res, next) =>{
    try {
            JWT.verify(req.headers.authorization, process.env.JWT_Key)
            // req.user = decode
            next()
    } catch (error) 
    {
         console.log(JWT ,'error')   
    }
}

