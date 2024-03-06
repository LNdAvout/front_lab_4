import React, {useContext, useState} from "react";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import "primereact/resources/themes/lara-light-purple/theme.css";
import "../App.css"
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function LoginPage() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    const [isActive, setIsActive] = useState(false)
    const [answer, setAnswer] = useState([])
    const {isAuth, setIsAuth, token, setToken} = useContext(AuthContext)
    const [user, setUser] = useState({
        username:'',
        password:''
    })
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }

    const{username,password}=user

    const onInputChange = (e) => {
        setUser({...user,[e.target.name]:e.target.value})
        setIsActive(false)
        setMessage('')
    }

    const addLogin = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/auth/authenticate",
            user).then((res) => {
            const answer = res.data
            setAnswer(answer)
            setToken(answer.token)
            localStorage.setItem('token', answer.token)
            setIsAuth(true)
            localStorage.setItem('auth', 'true')
            navigate('/main')
        })
            .catch((error) => {
                setMessage('Неправильное имя пользователя или пароль')
                setIsActive(true)
            });
    }

    function handleClick(event) {
        navigate('/reg');
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

                    <span className="p-float-label" >

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

                    <Button id="submit" label="Вход" onClick={addLogin}/>
                </div>

                <div className={"regdiv"}>
                    <p id={"ots"} className="m-0">
                        Еще нет учетной записи?
                    </p>
                    <Button id="regbut" label="Регистрация" link onClick={handleClick}/>
                </div>
            </Card>

        </div>
    );
}

export default LoginPage;