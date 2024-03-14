import express from "express"
import { getMyProfile, register,login ,logout} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router= express.Router();

// router.get("/all", getAllUsers);

router.post("/new", register);

router.post("/login", login);
router.get("/logout",isAuthenticated,logout)


router.get("/me",isAuthenticated,getMyProfile)


export default router;