import React from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import loginStyle from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { loginUser } from "../../services/actions/currentSessionActions/loginUser";
import { useShowPassword } from "../../hooks/useShowPassword";

export function LoginPage() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const data = {
            email: email,
            password: password,
        };
        dispatch(loginUser(data, () => navigate("/")));
    }

    return (
        <>
            <AppHeader />
            <div className={loginStyle.background}>
                <div className={loginStyle.container}>
                    <h1 className="text text_type_main-medium mb-6">Вход</h1>
                    <form className={loginStyle.form}>
                        <Input
                            type={"email"}
                            placeholder={"E-mail"}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} />

                        <Input
                            placeholder={"Пароль"}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            {...useShowPassword()} />
                    </form>

                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        onClick={(e) => handleSubmit(e)}
                    >Войти</Button>

                    <div className={loginStyle.links}>
                        <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?
                            <Link to="/register" className={`${loginStyle.link} text`}> Зарегистрироваться</Link>
                        </p>

                        <p className="text text_type_main-default text_color_inactive">Забыли пароль?
                            <Link to="/forgot-password" className={`${loginStyle.link} text`}> Восстановить пароль</Link>
                        </p>

                    </div>
                </div>
            </div>

        </>
    );
}