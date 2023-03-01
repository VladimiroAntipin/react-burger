import React from "react";
import resetPasswordStyle from "./reset-password.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";
import { useShowPassword } from "../../hooks/useShowPassword";
import { updatePassword } from "../../utils/sessionApi";

export function ResetPasswordPage() {
    const [password, setPassword] = React.useState("");
    const [token, setToken] = React.useState("");

    const navigate = useNavigate();

    React.useEffect(() => {
        if (!localStorage.getItem("resetPassword")) {
            navigate("/forgot-password", { replace: true });
        }
    })

    function handleSubmit(event) {
        event.preventDefault();
        const data = {
            password: password,
            token: token,
        };
        updatePassword(data).then(() => {
            localStorage.removeItem("resetPassword");
            navigate("/login");
        })
    }

    return (
        <>
            <AppHeader />
            <div className={resetPasswordStyle.background}>
                <div className={resetPasswordStyle.container}>
                    <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                    <form className={resetPasswordStyle.form}>
                        <Input
                            {...useShowPassword()}
                            placeholder={"Введите новый пароль"}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} />

                        <Input
                            type={"text"}
                            placeholder={"Введите код из письма"}
                            onChange={(e) => setToken(e.target.value)}
                            value={token}
                        />
                    </form>

                    <Button
                        htmlType="button"
                        type="primary"
                        size="medium"
                        onClick={(e) => handleSubmit(e)}>Сохранить</Button>

                    <div className={resetPasswordStyle.links}>
                        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?
                            <Link to="/login" className={`${resetPasswordStyle.link} text`}> Войти</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}