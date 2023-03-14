import profileStyle from "./profile.module.css";
import { NavLink, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logoutUser } from "../../services/actions/currentSessionActions/logoutUser";
import { OrderHistory } from "../../components/OrderHistory/OrderHistory";
import { User } from "../../components/User/user";

export function ProfilePage() {
  const dispatch = useAppDispatch();

  let activeStyle = { color: "white" };

  function handleSignOut(event: { preventDefault: () => void; }) {
    event.preventDefault();
    dispatch(logoutUser());
  }

  return (
    <>
      <div className={profileStyle.background}>
        <div className={profileStyle.container}>
          <div className={profileStyle.buttonsContainer}>
            <div className={profileStyle.navigationBar}>
              <NavLink
                to="/profile/user"
                className={`${profileStyle.button} text text_type_main-medium text_color_inactive`}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Профиль
              </NavLink>
              <NavLink
                to="/profile/order-history"
                className={`${profileStyle.button} text text_type_main-medium text_color_inactive`}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                История заказов
              </NavLink>
              <NavLink
                to="/login"
                className={`${profileStyle.button} text text_type_main-medium text_color_inactive`}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                onClick={handleSignOut}
              >
                Выход
              </NavLink>
            </div>
            <p className="text text_type_main-small text_color_inactive">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>

          <div className={profileStyle.contentBox}>
            <Routes>
              <Route path="/user" element={<User />} />
              <Route path="/order-history" element={<OrderHistory />} />
            </Routes>

          </div>
        </div>
      </div>
    </>
  );
}
