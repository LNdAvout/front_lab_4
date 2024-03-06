import React, {useContext, useState} from "react";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import "../App.css"
import {useNavigate} from "react-router-dom"
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function RegPage() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    const [answer, setAnswer] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [user, setUser] = useState({
        username:'',
        password:''
    })
    const {isAuth, setIsAuth, token, setToken} = useContext(AuthContext)

    const{username,password}=user

    const onInputChange = (e) => {
        setUser({...user,[e.target.name]:e.target.value})
        setIsActive(false)
        setMessage('')
    }
    const addLogin = async (e) => {
        e.preventDefault()
        if (user.password === "") {
            setMessage('Поле пароля должно быть заполнено!')
            setIsActive(true)
        } else {
            await axios.post("http://localhost:8080/auth/register",
                user).then((res) => {
                const answer = res.data
                setAnswer(answer)
                setToken(answer.token)
                localStorage.setItem('token', answer.token)
                setIsAuth(true)
                localStorage.setItem('auth', 'true')
            })
                .catch((error) => {
                    setMessage('Такое имя пользователя уже занято')
                    setIsActive(true)
                });
        }
    }

    function handleClick(event) {
        navigate('/login');
    }

    return (
        <div className={"LoginPage"}>
            <Card className={"card"}>
                <h1 className={"vhod"}>LAB 4</h1>
                <div className={"auth"}>
                    <span className="p-float-label">
                        <InputText className={isActive ? 'p-invalid' : ''}
                            id="username"
                            type={"text"}
                            name={"username"}
                            value={username}
                            onChange={(e) => onInputChange(e)}
                        />
                        <label htmlFor="username">Введите логин</label>
                    </span>
                    <div className={"error"}>{message}</div>
                    <span className="p-float-label">
                        <Password className={isActive ? 'p-invalid' : ''}
                            id="password"
                            name={"password"}
                            value={password}
                            onChange={(e) => onInputChange(e)}
                            feedback={false}
                            toggleMask
                        />
                        <label htmlFor="password">Введите пароль</label>
                    </span>
                        <Button id="submit" label="Регистрация" onClick={addLogin}/>
                </div>

                <div id={"ots"} className={"regdiv"}>
                    <p className="m-0">
                        Уже есть учетная запись?
                    </p>
                    <Button id="vhobut" label="Вход" link onClick={handleClick}/>
                </div>
            </Card>

        </div>
    );
}

export default RegPage;