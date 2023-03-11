import React from "react";

export const useShowPassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>();

  return {
    type: isPasswordVisible ? "text" : "password",
    icon: isPasswordVisible ? "HideIcon" : "ShowIcon",
    onIconClick: () => setIsPasswordVisible(!isPasswordVisible),
  };
};
