import mongoose, {Schema, Document} from "mongoose";


export interface Message extends Document{
    content: string,
    createdAt: Date
}

const messageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required:  true,
        default: Date.now
    }
})


export interface User extends Document{
    userName: string,
    email: string,
    password: string,
    isvarified: Boolean,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isAcceptingMessages: boolean,
    messages: Message[]
}

const userSchema : Schema<User> = new Schema({
    userName: {
        type: String,
        required: [true, "username is required"],
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "password is required"]
    },

    isvarified: {
        type: Boolean,
        default: false
    },

    verifyCode: {
        type: String,
        required: [true, "verifyCode is required"]
    },

    verifyCodeExpiry: {
        type: Date,
        required: [true, "verifyCodeExpiry is required"]
    },

    isAcceptingMessages: {
        type: Boolean,
        default: true
    },

    messages: [messageSchema]  //the datatype of all messages are messageSchema. which i impoted from our message model.
})

const userModel = (mongoose.models.User as mongoose.Model <User>) || 
mongoose.model<User>("User", userSchema)

export default userModel