import { Router } from "express";

import { isAuthenticated, isOwner } from "../../middlewares";
import {
  getAllUsers,
  getUserByID,
  updateUserByID,
  deleteUserByID,
} from "./users.controller";

const router = Router();

// @route GET api/users
// @desc Fetch all users
// @access Private

router.get("/", isAuthenticated, getAllUsers);

// @route GET api/v1/user/:id
// @desc Get a user by ID
// @access Private

router.get("/:id", isAuthenticated, getUserByID);

// @route PATCH api/v1/user/:id
// @desc Update a user by ID
// @access Private

router.patch("/:id", isAuthenticated, isOwner, updateUserByID);

// @route DELETE api/v1/:id
// @desc delete a lesson by ID
// @access Private

router.delete("/:id", isAuthenticated, isOwner, deleteUserByID);

export default router;
