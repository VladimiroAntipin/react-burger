import React from "react";
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import loginStyle from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { loginUser } from "../../services/actions/currentSessionActions/loginUser";

export function LoginPage() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function handleSubmit(event: React.SyntheticEvent<Element, Event>) {
        event.preventDefault();
        const data = {
            email: email,
            password: password,
        };
        dispatch(loginUser(data, () => navigate("/")));
    }

    return (
        <>
            <div className={loginStyle.background}>
                <div className={loginStyle.container}>
                    <h1 className="text text_type_main-medium mb-6">Вход</h1>
                    <form className={loginStyle.form} onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            placeholder="E-mail"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        <PasswordInput
                            placeholder="Пароль"
                            onChange={(e) => setPassword(e.target.value)}
                            icon="ShowIcon"
                            value={password}
                            size="default"
                        />

                        <div className={loginStyle.buttonBox}>
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="medium"
                            >Войти</Button>
                        </div>
                    </form>



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