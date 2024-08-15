"use server"

import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";

export async function signup(prevState, formdata) {
    const email = formdata.get('email');
    const password = formdata.get('password');

    let errors = {};

    if(!email.include('@')){
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
    createUser(email, password);

}
