import React from "react";
import registerStyle from "./register.module.css";
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { registerUser } from "../../services/actions/currentSessionActions/registration";

export function RegistrationPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleSubmit(event: React.SyntheticEvent<Element, Event>) {
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
            <div className={registerStyle.background}>
                <div className={registerStyle.container}>
                    <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
                    <form className={registerStyle.form} onSubmit={handleSubmit}>
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
                            value={email}
                        />
                        <PasswordInput
                            placeholder={"Пароль"}
                            icon="ShowIcon"
                            size="default"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} />

                        <div className={registerStyle.buttonBox}>
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="medium"
                            >Зарегистрироваться
                            </Button>
                        </div>
                    </form>

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