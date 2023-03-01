import React from "react";
import registerStyle from "./register.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { registerUser } from "../../services/actions/currentSessionActions/registration";
import AppHeader from "../../components/AppHeader/AppHeader";
import { useShowPassword } from "../../hooks/useShowPassword";


export function RegistrationPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleSubmit(event) {
        event.preventDefault();
        if (password.length < 6 || !name || !email) return;
        const data = {
            name: name,
            email: email,
            password: password,
        };
        dispatch(registerUser(data, () => navigate("/login")));
    }

    return (
        <>
            <AppHeader />
            <div className={registerStyle.background}>
                <div className={registerStyle.container}>
                    <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
                    <form className={registerStyle.form}>
                        <Input
                            type={"text"}
                            placeholder={"Имя"}
                            name={"name"}
                            onChange={(e) => setName(e.target.value)}
                            value={name} />
                        <Input
                            type={"email"}
                            placeholder={"E-mail"}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} />
                        <Input
                            {...useShowPassword()}
                            placeholder={"Пароль"}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} />
                    </form>

                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        onClick={(e) => handleSubmit(e)}>Зарегистрироваться</Button>

                    <div className={registerStyle.links}>

                        <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?
                            <Link to="/login" className={`${registerStyle.link} text`}> Войти</Link>
                        </p>

                    </div>
                </div>
            </div>
        </>
    );
}