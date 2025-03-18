import {NextAuthOptions} from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials" //credentials se login karwane ke liye.
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect"
import userModel from "@/model/user.model"

//ab  hmne seperate file me options banaya to export bhi karna padega. kyuki use 
//to at the end krna route me hi hai.

export const authOptions : NextAuthOptions = {
    providers: [//ab providers me chahe googleProvider add karo chahe githubprovider. easy peezy.
        CredentialsProvider({
            name: "Credentials", //the signin page will generate with this name

            credentials: {
                username: { label: "UserName", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
              }, //nextauth will generate html structure behind the scene for 
              // interface provided to user.

              async authorize(credentials: any): Promise<any>{
                await dbConnect()

                try {
                    const user = await userModel.findOne({
                        $or: [
                        {userName: credentials.identifier.userName},
                        {email: credentials.identifier}
                    ]
                    })

                    if(!user){
                        throw new Error('no user find with this email or username')
                    }
                    if(!user.isVarified){
                        throw new Error('please verify your account before login')
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                    if(isPasswordCorrect){
                        return user
                    }
                    else{
                        throw new Error('incorrect password')
                    }
                } catch (err : any) {
                    throw new Error(err)
                }
              }
        })   
    ], 

    callbacks: {
          async jwt({ token, user}) { //ye user jo hmne last me providers ke ander return kiya waha se aata hai.
            token._id = user._id?.toString()
            token.isVerified = user.isVerified
            token.isAcceptingMessages = user.isAcceptingMessages
            token.userName = user.userName

            return token
          },
          async session({ session, token }) {
            session.user._id = token.id
            session.user.isVerified = token.isVerified
            session.user.isAcceptingMessages = token.isAcceptingMessages
            session.user.userName = token.userName
            return session
          }
    },

    pages: {
        signIn:'/sign-in' //an next auth automatically is path ka ui wagerah bhi design kr lega. no need to care.
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}