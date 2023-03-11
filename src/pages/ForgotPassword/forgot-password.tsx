import React from "react";
import forgotPasswordStyle from "./forgot-password.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";
import { resetPassword } from "../../utils/sessionApi";

export function ForgotPasswordPage() {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState("");

    function handleSubmit(event: React.SyntheticEvent<Element, Event>) {
        event.preventDefault();
        const data = {
            email: email,
        };
        resetPassword(data).then(() => {
            localStorage.setItem("resetPassword", "true");
            navigate("/reset-password", { replace: true });
        })
    }

    return (
        <>
            <AppHeader />
            <div className={forgotPasswordStyle.background}>
                <div className={forgotPasswordStyle.container}>
                    <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                    <form className={forgotPasswordStyle.form}>
                        <Input
                            type={"email"}
                            value=""
                            placeholder={"Укажите e-mail"}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </form>

                    <Button
                        htmlType={"button"}
                        type={"primary"}
                        size={"medium"}
                        onClick={handleSubmit}>
                        Восстановить
                    </Button>

                    <div className={forgotPasswordStyle.links}>
                        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?
                            <Link to="/login" className={`${forgotPasswordStyle.link} text`}> Войти</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}