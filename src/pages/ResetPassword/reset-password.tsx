import React from "react";
import resetPasswordStyle from "./reset-password.module.css";
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
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

    function handleSubmit(event: React.SyntheticEvent<Element, Event>) {
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
            <div className={resetPasswordStyle.background}>
                <div className={resetPasswordStyle.container}>
                    <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                    <form className={resetPasswordStyle.form} onSubmit={handleSubmit}>
                        <PasswordInput
                            placeholder={"Введите новый пароль"}
                            icon="ShowIcon"
                            size="default"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} />

                        <Input
                            type={"text"}
                            placeholder={"Введите код из письма"}
                            onChange={(e) => setToken(e.target.value)}
                            value={token}
                        />

                        <div className={resetPasswordStyle.buttonBox}>
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="medium"
                            >Сохранить
                            </Button>
                        </div>
                    </form>



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