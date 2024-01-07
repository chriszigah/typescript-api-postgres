import { Router } from "express";

import { addUser, loginUser, logout } from "./auth.controllers";
import { forwardAuthentication, isAuthenticated } from "../../middlewares";

const router = Router();

// @route GET user/login
// @desc Login a User
// @access Public

router.post("/login", forwardAuthentication, loginUser);

// @route GET user/logout
// @desc Logout a User
// @access Public

router.get("/logout", logout);

// @route POST api/v1/user
// @desc Create a User
// @access Public

router.post("/register", addUser);

// @route GET api/user
// @desc Fetch all users
// @access Private

export default router;
