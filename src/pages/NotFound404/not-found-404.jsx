import NotFound404Style from "./not-found-404.module.css";
import NotFound from "../../images/404.png"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";


export function NotFound404() {
    return (
        <>
            <AppHeader />
            <div className={NotFound404Style.background}>
                <div className={NotFound404Style.container}>
                    <div className={NotFound404Style.textContainer}>
                        <p className="text text_type_main-large">Страница не найдена, ошибка 404</p>
                        <Link to="/">
                            <Button htmlType="button" type="primary" size="large">На главную</Button>
                        </Link>
                    </div>

                    <img src={NotFound} alt="Страница не найдена" className={NotFound404Style.image} />

                </div>
            </div>
        </>
    );
}