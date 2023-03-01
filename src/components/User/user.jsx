import React from "react";
import userStyles from "./user.module.css";
import { Input, Button, } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../hooks/useAppSelector";
import { editProfile } from "../../services/actions/currentSessionActions/setUserInfo";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export function User() {
    const currentUser = useAppSelector((state) => state.currentSession.currentUser);
    const dispatch = useAppDispatch();

    const [name, setName] = React.useState(currentUser?.name ?? "");
    const [email, setEmail] = React.useState(currentUser?.email ?? "");
    const [password, setPassword] = React.useState(currentUser?.password ?? "")

    function handleSubmitChanges() {
        const data = {
            name: name,
            email: email,
            password: password,
        }; 
            dispatch(editProfile(data))
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
                            icon={"EditIcon"}
                            value={name}
                            size={"default"}
                        />
                    </li>
                    <li className={`${userStyles.userListItem} mb-6`}>
                        <Input
                            type={"text"}
                            placeholder={"Логин"}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={"EditIcon"}
                            value={email}
                            size={"default"}
                        />
                    </li>
                    <li className={`${userStyles.userListItem} mb-6`}>
                        <Input
                            type={"password"}
                            placeholder={"Пароль"}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={"EditIcon"}
                            value={password}
                            size={"default"}
                        />
                    </li>
                </ul>
                <div className={userStyles.buttonBox}>
                    <Button htmlType="button" type="primary" size="medium" onClick={() => handleSubmitChanges()}>
                        Сохранить
                    </Button>
                </div>
            </div>
        </>
    );
}