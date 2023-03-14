import { SessionCheckAuthAction } from "./checkUserAuth";
import { SessionForgotAction } from "./forgotPassword";
import { SessionGetCurrentUserAction } from "./getCurrentUser";
import { SessionUserLoginAction } from "./loginUser";
import { SessionLogoutAction } from "./logoutUser";
import { SessionRecoverPasswordAction } from "./recoverPassword";
import { SessionRegisterAction } from "./registration";
import { SessionEditProfileAction } from "./setUserInfo";

export * from "./checkUserAuth";
export * from "./forgotPassword";
export * from "./getCurrentUser";
export * from "./loginUser";
export * from "./logoutUser";
export * from "./recoverPassword";
export * from "./registration";
export * from "./setUserInfo";

export type SessionAction =
  | SessionCheckAuthAction
  | SessionForgotAction
  | SessionEditProfileAction
  | SessionGetCurrentUserAction
  | SessionRegisterAction
  | SessionLogoutAction
  | SessionUserLoginAction
  | SessionRecoverPasswordAction;