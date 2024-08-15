import db from "./db";

export function createUser(email, password){
    const result = db.prepare('INSERT INTO users (emails,  password) VALUES (?,?)')
    .run(email, password)

    return result.lastInsertRowid;
}

