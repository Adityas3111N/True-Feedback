//easy and straight in express etc. but in nextjs its a edge time framework.
// as user requests it runs. not all time running.

//hamesa check karenge ki pehele se db connected hai ya nahi aur then connect
// karenge always. wrna aaplication choke ho jaegi.

import mongoose from "mongoose";

type connectionObject = {  //typescript. check on type of connectionObject 
    isConnected ?: number 
}

const connection: connectionObject = {} //connection is connectionObject type. initialised as empty

async function dbConnect() : Promise<void>{ //function will return a promise and its datatime doesn't matter (void)
    if(connection.isConnected){
        console.log("Already connected to database")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {}) 
        
        connection.isConnected = db.connections[0].readyState

        console.log("DB connected successfully.")
    } catch (error) {
        
        console.log("DB connection failed.", error)
        process.exit(1)
    }
}

export default dbConnect


//nextjs is serverless framework. Unlike traditional Express servers that run continuously,
//Next.js runs functions on demand when a request is made.

//this means that you have to check if it is aleady connected to database while making any request 
//otherwise you will end up making several new connections that will choke the aaplication.