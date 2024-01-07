const db = require("../../db");

interface Auth {
  id: string;
  userid: string;
  password: string;
  salt: string;
  sessionToken: string | null;
}

export async function createNewAuth(auth: Auth) {
  return await db("auth").insert(auth);
}

export async function findAllAuths() {
  return await db("auth");
}

export async function findAuthByUserID(Userid: string) {
  return await db("auth").where({ userid: Userid }).first();
}

export async function getAuthBySessionToken(SessionToken: string) {
  return await db("auth").where({ sessionToken: SessionToken });
}

export async function updateAuth(userid: string, changes: any) {
  return await db("auth")
    .where({ userid })
    .update(changes)
    .then(() => {
      return findAuthByUserID(userid);
    });
}

export async function removeAuthByUserID(Userid: string) {
  return await db("auth").where({ userid: Userid }).del();
}
