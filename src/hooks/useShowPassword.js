import React from "react";

export const useShowPassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState();

  return {
    type: isPasswordVisible ? "text" : "password",
    icon: isPasswordVisible ? "HideIcon" : "ShowIcon",
    onIconClick: () => setIsPasswordVisible(!isPasswordVisible),
  };
};
