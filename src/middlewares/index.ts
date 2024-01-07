import { Request, Response, NextFunction } from "express";
import { get, merge } from "lodash";
import { getAuthBySessionToken } from "../api/auth/auth.model";

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (process.env.NODE_ENV === "test") {
      return next();
    }
    const { id } = req.params;
    const currentUserId = get(req, "identity._id");

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId !== id) {
      return res.sendStatus(403);
    }
    next();
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookieName: any = process.env.COOKIE_SESSION_NAME;
  try {
    if (process.env.NODE_ENV === "test") {
      return next();
    }
    const sessionToken = req.cookies[cookieName];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const dbUser = await getAuthBySessionToken(sessionToken);

    if (!dbUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: dbUser });

    return next();
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

export const forwardAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookieName: any = process.env.COOKIE_SESSION_NAME;
    if (process.env.NODE_ENV === "test") {
      return next();
    }
    const sessionToken = req.cookies[cookieName];

    if (sessionToken) {
      return res.status(200).json({ msg: "Already logged in" });
    }
    return next();
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};
