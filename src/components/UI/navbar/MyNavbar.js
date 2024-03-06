import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import 'primeicons/primeicons.css';
import { PrimeIcons } from 'primereact/api';
import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext";

const MyNavbar = () => {
    const {isAuth, setIsAuth, token, setToken} = useContext(AuthContext)
    const navigate = useNavigate();
    const items = [
        {
            id: '1',
            label: 'Вход',
            icon: 'pi pi-user',
            command: () => {
                navigate('/login', { replace: true });
            }
        },
        {
            id:'2',
            label: 'Регистрация',
            icon: 'pi pi-user-plus',
            command: () => {
                navigate('/reg', { replace: true });
            }
        },
        {
            id:'3',
            label: 'Кукольников Егор'
        },
        {
            id:'4',
            label: 'Группа P3215'
        },
        {
            id:'6',
            label: 'Вариант 422'
        }
    ];
    const items_2 = [
        {
            id: '1',
            label: 'Выход',
            icon: 'pi pi-sign-out',
            command: () => {
                setToken('')
                localStorage.setItem('token', '')
                setIsAuth(false)
                localStorage.removeItem('auth')
                navigate('/login', { replace: true });
            }
        }
    ];
    return (
        !isAuth
            ?
            <Menubar model={items} />
            :
            <Menubar model={items_2} />
    )
}

export default MyNavbar