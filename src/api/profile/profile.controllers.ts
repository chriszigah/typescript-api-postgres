import { Request, Response } from "express";
import { generateId } from "../../helpers";
import {
  addProfile,
  findAllProfiles,
  removeProfileByID,
  updateProfileByID,
  findProfileByID,
} from "./profile.model";

export const newProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, firstanme, lastname, dob, gender } = req.body;
    // Create Profile
    const profileId = generateId();

    const profile = await addProfile({
      id: profileId,
      userid: id,
      username: null,
      firstname: null,
      lastname: null,
      dob: null,
      gender: null,
    });

    return res.status(200).json({ profile });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await findAllProfiles();
    return res.status(200).json(profiles);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const getUserProfileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profile = await findProfileByID(id);
    return res.status(200).json(profile);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const changes = req.body;

    const dbUser = await findProfileByID(id);

    if (!dbUser) {
      return res.sendStatus(404);
    }

    const updateId = dbUser.id;

    const updatedUser = await updateProfileByID(updateId, changes);
    return res.status(200).json(updatedUser).end();
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await removeProfileByID(id);
    return res.status(401).json(deletedUser);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};
