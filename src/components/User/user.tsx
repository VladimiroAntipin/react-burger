import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { editProfile } from "../../services/actions/currentSessionActions/setUserInfo";
import userStyles from "./User.module.css";

export function User() {
    const currentUser = useAppSelector(
        (state) => state.currentSession.currentUser
    );
    const dispatch = useAppDispatch();

    const [name, setName] = React.useState(currentUser?.name ?? "");
    const [email, setEmail] = React.useState(currentUser?.email ?? "");
    const [password, setPassword] = React.useState("");

    const isButtonDisabled =
        name === currentUser?.name &&
        email === currentUser?.email &&
        password.length < 6;

    const [nameDisabled, setNameDisabled] = React.useState(true);
    const [emailDisabled, setEmailDisabled] = React.useState(true);

    const nameInputRef = React.useRef<HTMLInputElement>(null);
    const emailInputRef = React.useRef<HTMLInputElement>(null);

    function onIconClick(
        input: React.RefObject<HTMLInputElement>,
        setState: Dispatch<SetStateAction<boolean>>
    ) {
        setTimeout(() => input.current?.focus?.(), 0);
        setState(false);
    }

    function handleSubmitChanges() {
        if (password.length < 6) {
            const data = {
                name: name,
                email: email,
            };
            dispatch(editProfile(data));
        } else {
            const data = {
                name: name,
                email: email,
                password: password,
            };
            dispatch(editProfile(data));
        }
    }

    function resetForm() {
        if (currentUser === null || undefined) {
            setName("Загрузка...");
            setEmail("Загрузка...");
            setPassword("Загрузка...");
        } else {
            setName(currentUser.name);
            setEmail(currentUser.email);
            setPassword("");
        }
        setNameDisabled(true);
        setEmailDisabled(true);
    }

    return (
        <>
            <div className={userStyles.user}>
                <ul className={userStyles.userList}>
                    <li className={`${userStyles.userListItem} mb-6`}>
                        <Input
                            type={"text"}
                            placeholder={"Имя"}
                            onChange={(e) => setName(e.target.value)}
                            onIconClick={() => onIconClick(nameInputRef, setNameDisabled)}
                            icon={"EditIcon"}
                            value={name}
                            size={"default"}
                            disabled={nameDisabled}
                            ref={nameInputRef}
                        />
                    </li>
                    <li className={`${userStyles.userListItem} mb-6`}>
                        <Input
                            type={"email"}
                            placeholder={"Логин"}
                            onChange={(e) => setEmail(e.target.value)}
                            ref={emailInputRef}
                            onIconClick={() => onIconClick(emailInputRef, setEmailDisabled)}
                            icon={"EditIcon"}
                            value={email}
                            size={"default"}
                            disabled={emailDisabled}
                        />
                    </li>
                    <li className={`${userStyles.userListItem} mb-6`}>
                        <PasswordInput
                            placeholder={"Пароль"}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={"EditIcon"}
                            value={password}
                            size={"default"}
                        />
                    </li>
                </ul>
                <div className={userStyles.buttonBox}>
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        onClick={() => resetForm()}
                    >
                        Отмена
                    </Button>

                    <Button
                        htmlType="button"
                        type="primary"
                        size="medium"
                        onClick={() => handleSubmitChanges()}
                        disabled={isButtonDisabled}
                    >
                        Сохранить
                    </Button>
                </div>
            </div>
        </>
    );
}