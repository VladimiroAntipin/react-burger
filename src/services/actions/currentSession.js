import { checkUserAuth } from "./currentSessionActions/checkUserAuth";
import { getCurrentUser } from "./currentSessionActions/getCurrentUser";

import { forgotPassword } from "./currentSessionActions/forgotPassword";
import { recoverPassword } from "./currentSessionActions/recoverPassword";

import { registerUser } from "./currentSessionActions/registration";
import { loginUser } from "./currentSessionActions/loginUser";
import { logoutUser } from "./currentSessionActions/logoutUser";

import { editProfile } from "./currentSessionActions/setUserInfo";

export const currentSession = [
    checkUserAuth,
    forgotPassword,
    getCurrentUser,
    loginUser,
    logoutUser,
    recoverPassword,
    registerUser,
    editProfile
];