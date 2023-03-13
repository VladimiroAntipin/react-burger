import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import appStyle from "../App/App.module.css";
import AppHeader from "../AppHeader/AppHeader";

export const ProtectedRoute = ({
  authorized = true,
  children,
}: PropsWithChildren<{ authorized?: boolean }>) => {
  const location = useLocation();

  const authChecked = useAppSelector(
    (store) => store.currentSession.isCurrentUserChecked
  );

  const user = useAppSelector((store) => store.currentSession.currentUser);

  if (!authChecked) {
    return (
      <>
        <AppHeader />
        <div className={`${appStyle.loading} text text_type_main-large`}>
          Загрузка...
        </div>
      </>
    );
  }

  if (!authorized && user) {
    const to = location?.state?.from ?? "/";
    return <Navigate to={to} />;
  }

  if (authorized && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children as JSX.Element;
};