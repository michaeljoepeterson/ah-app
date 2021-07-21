import { User } from "./user";

export interface AuthInfo{
    token?:string;
    email?:string;
    user?:User
}