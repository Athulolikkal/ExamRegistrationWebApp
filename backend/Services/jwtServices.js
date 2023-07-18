import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const jwtAccessToken=(email)=>{
    try{
        const payload = { email }
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h'})
       console.log(accessToken);
        return accessToken
    }catch(err){
        console.log(err);
    }
}