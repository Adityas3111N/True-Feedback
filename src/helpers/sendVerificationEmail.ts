//ye hi main file hai jis se email bheja jata hai.
import { resend } from "@/lib/resend"; //y to jaruri hai sara kaam to yhi krta hai.

import verificationEmail from "../../emails/verificationEmail" //yha se pura 
//frontend aata hai. when email is send. it uses email and otp.
import { ApiResponse } from "@/types/apiResponse"; //this will just ease out sending responses.

export async function sendVerificationEmail(
    email: string,
    userName: string,
    verifyCode: string
): Promise<ApiResponse>{

    try {

        await resend.emails.send({
            from: 'singhaditya4333@gmail.com',
            to: email,
            subject: 'Truefeedback Verification Code',
            react: verificationEmail({ userName, otp: verifyCode }), //expect 
            // react component which we made for frontend of verification otp.
          });

        return {
            success: true,
            message: "verification email successfully sent"
        }
    } catch (emailError) {
        console.error("error sending verification email", emailError)
        return {
            success: false,
            message: "failed to send verification email."
        }
    }
}