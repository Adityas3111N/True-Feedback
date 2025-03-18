//next js me har ek route pe api ke db to connect krna hi padega bcz it runs over 
//edge time.


import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/user.model.js";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { ApiResponse } from "@/types/apiResponse";

//y framework h is wajah se kuch chijein rigid hai. like name should be route.
//api/sign-up
//so no need to provide route as previously we do.
//just tell request type. post get patch etc.

export async function POST(request : Request){

    await dbConnect()

    try {
        const{userName, email, password} = await request.json()

        const existingUserVarifiedByUserName = await userModel.findOne({
            userName,
            isVerified: true
            })

            if(existingUserVarifiedByUserName){
                return Response.json({
                    success: false,
                    message: "userName is already taken.",
                }, {status: 400})
            }

            //email check
            const existingUserByEmail = await userModel.findOne({email})

            const verifyCode = Math.floor(100000 + Math.random()*900000).toString()

            if(existingUserByEmail){
                if(existingUserByEmail.isVarified){
                    return Response.json(
                        {
                            success: false,
                            message: "user with this email is already registered",
                        }, {status: 400}
                    )
                }
                else{
                    const hashedPassword = await bcrypt.hash(password, 10)

                    existingUserByEmail.password = hashedPassword
                    existingUserByEmail.verifyCode = verifyCode
                    existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600*3600)
                    await existingUserByEmail.save()
                }
            }
            else{
                const hashedPassword = await bcrypt.hash(password, 10)
                const expiryDate = new Date()
                expiryDate.setHours(expiryDate.getHours() + 1)

                const newUser = new userModel({ 
                        userName,
                        email,
                        password: hashedPassword,
                        isVarified: false,
                        verifyCode,
                        verifyCodeExpiry: expiryDate,
                        isAcceptingMessages: true,
                        messages: []
                    })
                    await newUser.save()
                }
                //send verification email
                const emailResponse = await sendVerificationEmail(
                    email,
                    userName,
                    verifyCode
                )

                if(!emailResponse.success){
                    return Response.json(
                        {
                            success: false,
                            message: emailResponse.message,
                        }, {status: 500}
                    )
                }

                return Response.json({
                    success: true,
                    message: "user registered successfully. please verify your email.",
                }, {status: 200})
            }
        catch (error) {
        console.log("user registration failed.", error)
        return Response.json({
            success: false,
            message: "user registration failed",
        },
        {
            status: 500
        }
    )
    }
}