// these all are small utilities. like this will help standardise the response
//sent each time.

//in whole types folder mostly i will make different interfaces and reuse them.
import { Message } from "@/model/user.model.js";

export interface ApiResponse{
    status?: number
    success: boolean;
    message: string;
    isacceptingMessages?: boolean;
    messages?: Array<Message>  //array of messages. interface is imported so typesafty done.
}