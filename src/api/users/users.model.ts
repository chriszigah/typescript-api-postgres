const db = require("../../db");

interface User {
  id: string;
  role: string;
  email: string;
}

export async function createUser(user: User) {
  return await db("users").insert(user);
}

export async function findAllUSers() {
  return await db("users");
}

export async function findUserByID(id: string) {
  return await db("users").where({ id: id }).first();
}

export async function findUserByEmail(email: string) {
  return await db("users").where({ email }).first();
}

export async function updateUser(id: string, changes: any) {
  return await db("users")
    .where({ id: id })
    .update(changes)
    .then(() => {
      return findUserByID(id);
    });
}

export async function removeUserByID(userid: string) {
  return await db("users").where({ userid }).del();
}
