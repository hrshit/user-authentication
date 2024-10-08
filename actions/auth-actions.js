"use server"

import { createAuthSession } from "@/lib/auth";
import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(prevState, formdata) {
    const email = formdata.get('email');
    const password = formdata.get('password');

    let errors = {};

    if(!email.includes('@')){
        errors.email = "please enter a valid email address";
    }
    if(password.trim().length < 8){
        errors.password = "Password must be at least 8 character long";
    }

    if(Object.keys(errors).length > 0){
        return {
            errors,
        }
    }
    //store it in the database to create a new user 
    
    const hashedPassword = hashUserPassword(password);
    try {
        const id = createUser(email, password);
        await createAuthSession(id) 
        redirect('/training');
    } catch (error) {
        if(error.code === "SQLITE_CONSTRAINT_UNIQUE"){
            return  {
                errors : {
                    email : "It seems like an account for the chosen email already exists "
                }
            }
        }
        console.log("error", error);
        throw error;
    }
    
    
}
