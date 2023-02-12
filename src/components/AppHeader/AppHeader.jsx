import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyle from "./AppHeader.module.css";

function AppHeader() {
  return (
    <header className={headerStyle.header}>
      <nav className={headerStyle.header__nav}>
        <ul className={`${headerStyle.header__list} mt-4 mb-4`}>
          <li className={headerStyle.header__listItem}>
            <a className={headerStyle.header__link_active} href="#">
              <BurgerIcon type={"primary"} />
              <p className={`${headerStyle.header__linkText} ml-2 text text_type_main-default`}>
                Конструктор
              </p>
            </a>
          </li>

          <li className={`${headerStyle.header__listItem} ml-2`}>
            <a className={headerStyle.header__link} href="#">
              <ListIcon type={"secondary"} />
              <p className={`${headerStyle.header__linkText} ml-2 text text_type_main-default`}>
                Лента Заказов
              </p>
            </a>
          </li>
        </ul>
        <div className={headerStyle.header__logo}>
          <Logo />
        </div>

        <a className={headerStyle.header__link} href="#">
          <ProfileIcon type={"secondary"} />
          <p className={`${headerStyle.header__linkText} ml-2 text text_type_main-default`}>
            Личный Кабинет
          </p>
        </a>
      </nav>
    </header>
  );
}

export default AppHeader;