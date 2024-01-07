import { Request, Response, NextFunction } from "express";

import {
  findAllUSers,
  findUserByID,
  removeUserByID,
  updateUser,
} from "./users.model";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dbUsers = await findAllUSers();
    res.status(200).json(dbUsers);
  } catch (e) {
    res
      .status(500)
      .json({ msg: "SERVER ERROR - SOMETHING WENT WRONG", error: "message" });
  }
};

export const getUserByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const dbUser = await findUserByID(id);
    dbUser === undefined
      ? res.status(404).json({ msg: `User with id ${id} not found` })
      : res.status(200).json(dbUser);
  } catch (e) {
    res
      .status(500)
      .json({ msg: "SERVER ERROR - SOMETHING WENT WRONG", error: "message" });
  }
};

export const updateUserByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const dbUser = await updateUser(id, changes);
    dbUser === undefined
      ? res.status(404).json({ msg: `User with id ${id} not found` })
      : res.status(200).json(dbUser);
  } catch (e) {
    res
      .status(500)
      .json({ msg: "SERVER ERROR - SOMETHING WENT WRONG", error: "e.message" });
  }
};

export const deleteUserByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userid } = req.params;
    const delUser = await removeUserByID(userid);
    delUser === undefined
      ? res.status(404).json({ msg: `User with id ${userid} not found` })
      : res.status(400).json({ msg: "User was deleted successfully" });
  } catch (e) {
    res
      .status(500)
      .json({ msg: "SERVER ERROR - SOMETHING WENT WRONG", error: "e.message" });
  }
};
