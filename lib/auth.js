import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import db from "./db";
import { cookies } from "next/headers";

const adapter = new BetterSqlite3Adapter(db , {
    user : 'users',
    session : 'sessions'
})   //need to pass the handle of our BetterSqlite3.Database
const lucia = new Lucia(adapter, {
    sessionCookie : {
        expires: false,
        attributes : {
            secure  : process.env.NODE_ENV === 'production'
        }
    }
})

export async function createAuthSession(userId) {
    const session =await lucia.createSession(userId);
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )
}