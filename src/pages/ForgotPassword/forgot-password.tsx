import React from "react";
import forgotPasswordStyle from "./forgot-password.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
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
            <div className={forgotPasswordStyle.background}>
                <div className={forgotPasswordStyle.container}>
                    <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                    <form className={forgotPasswordStyle.form} onSubmit={handleSubmit}>
                        <Input
                            type={"email"}
                            value={email}
                            placeholder={"Укажите e-mail"}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className={forgotPasswordStyle.buttonBox}>
                            <Button
                                htmlType={"submit"}
                                type={"primary"}
                                size={"medium"}
                            >
                                Восстановить
                            </Button>
                        </div>

                    </form>

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