import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyle from "./AppHeader.module.css";
import { NavLink, Link, useMatch } from "react-router-dom";

function AppHeader() {
  let activeStyle = { color: "white" };
  let isHomepage = !!useMatch({ path: "/" });
  let isOrders = !!useMatch({ path: "/not-found-404" });
  let isProfile = !!useMatch({ path: "/profile" });

  return (
    <header className={headerStyle.header}>
      <nav className={headerStyle.header__nav}>
        <ul className={`${headerStyle.header__list} mt-4 mb-4`}>

          <li className={headerStyle.header__listItem}>
            <NavLink to="/" className={headerStyle.header__link} style={({ isActive }) => isActive ? activeStyle : undefined}>
              <BurgerIcon type={isHomepage ? "primary" : "secondary"} />
              <p className={`${headerStyle.header__linkText} ml-2 text text_type_main-default`}>
                Конструктор
              </p>
            </NavLink>
          </li>

          <li className={`${headerStyle.header__listItem} ml-2`}>
            <NavLink to="/not-found-404" className={headerStyle.header__link} style={({ isActive }) => isActive ? activeStyle : undefined}>
              <ListIcon type={isOrders ? "primary" : "secondary"} />
              <p className={`${headerStyle.header__linkText} ml-2 text text_type_main-default`}>
                Лента Заказов
              </p>
            </NavLink>
          </li>
        </ul>

        <div className={headerStyle.header__logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <li className={headerStyle.header__listItem}>
          <NavLink to="/profile/user" className={headerStyle.header__link} style={({ isActive }) => isActive ? activeStyle : undefined}>
            <ProfileIcon type={isProfile ? "primary" : "secondary"} />
            <p className={`${headerStyle.header__linkText} ml-2 text text_type_main-default`}>
              Личный Кабинет
            </p>
          </NavLink>
        </li>

      </nav>
    </header>
  );
}

export default AppHeader;