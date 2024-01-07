const db = require("../../db");

interface Profile {
  id: any;
  userid: string | null;
  username: string | null;
  firstname: string | null;
  lastname: string | null;
  dob: string | null;
  gender: string | null;
}

export async function addProfile(Profile: Profile) {
  return await db("profiles").insert(Profile);
}

export async function findAllProfiles() {
  return await db("profiles");
}

export async function findProfileByID(id: string) {
  return await db("profiles").where({ id: id }).first();
}

export async function findProfileByUserId(userid: string) {
  return await db("profiles").where({ userid }).first();
}

export async function findProfileByUsername(username: string) {
  return await db("profiles").where({ username }).first();
}

export async function updateProfileByID(id: string, changes: Profile) {
  return await db("profiles")
    .where({ id: id })
    .update(changes)
    .then(() => {
      return findProfileByID(id);
    });
}

export async function removeProfileByID(id: string) {
  return await db("profiles").where({ id: id }).del();
}
