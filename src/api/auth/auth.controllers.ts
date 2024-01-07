import { Request, Response, NextFunction } from "express";
import { generateId } from "../../helpers";

import { createUser, findUserByEmail } from "../users/users.model";
import {
  createNewAuth,
  updateAuth,
  findAuthByUserID,
  getAuthBySessionToken,
} from "../auth/auth.model";

import { random, authentication } from "../../helpers";
import { addProfile } from "../profile/profile.model";

// Create a New User
export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newuserid = generateId();
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.sendStatus(500);
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ msg: "Email ALready Registered" });
    }

    await createUser({
      id: newuserid,
      email: email,
      role: role,
    });

    // Create Auth
    const salt = random();
    const authId = generateId();
    const authPassword = authentication(salt, password);

    await createNewAuth({
      id: authId,
      userid: newuserid,
      password: authPassword,
      salt: salt,
      sessionToken: null,
    });

    // Create Profile
    const profileId = generateId();
    await addProfile({
      id: profileId,
      userid: newuserid,
      username: null,
      firstname: null,
      lastname: null,
      dob: null,
      gender: null,
    });

    return res.status(201).json({ msg: "sucess, user created" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

interface UserModel {
  id: string;
  role: string;
  email: string;
}

interface UserAuth {
  id: string;
  userid: string;
  password: string;
  salt: string;
  sessionToken: string | null;
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookieName: any = process.env.COOKIE_SESSION_NAME;
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(500)
        .json({ msg: "Invalid Username/Password combination" });
    }

    const user: UserModel = await findUserByEmail(email);

    if (!user) {
      return res.status(500).json({ msg: "user does not exist" });
    }

    const userAuth: any = await findAuthByUserID(user.id);

    const expectedHash = authentication(userAuth.salt, password);

    if (userAuth.password !== expectedHash) {
      return res
        .status(403)
        .json({ msg: "Invalid Password/Username Combination 2" });
    }

    const salt = random();
    const newSessionToken = authentication(salt, user.id);
    await updateAuth(user.id, {
      id: userAuth.id,
      userid: user.id,
      password: userAuth.password,
      salt: userAuth.salt,
      sessionToken: newSessionToken,
    });

    res.cookie(cookieName, newSessionToken, {
      domain: "localhost",
      path: "/",
      httpOnly: true, // to disable accessing cookie via client side js
      secure: true, // to force https (if you use it)
      maxAge: 1000000, // ttl in seconds (remove this option and cookie will die when browser is closed)
      //signed: true, // if you use the secret with cookieParser
    });

    return res.status(200).json(user).end();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "something went wrong" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const cookieName: any = process.env.COOKIE_SESSION_NAME;
    const token = req.cookies[cookieName];

    const currentUser: UserAuth[] = await getAuthBySessionToken(token);

    const updateSessionToken = null;

    const updateUser = currentUser[0];

    await updateAuth(updateUser.userid, {
      id: updateUser.id,
      userid: updateUser.userid,
      password: updateUser.password,
      salt: updateUser.salt,
      sessionToken: updateSessionToken,
    });

    res.clearCookie(cookieName);

    return res.status(200).json({ msg: "Logout Successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "something went wrong" });
  }
};
