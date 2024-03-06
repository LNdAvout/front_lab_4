import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MyNavbar from "./components/UI/navbar/MyNavbar";
import "./App.css"
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context/AuthContext";
function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState('')

    useEffect(() => {
        if (localStorage.getItem('auth')){
            setIsAuth(true)
        }
        if (localStorage.getItem('token') !== ''){
            setToken(localStorage.getItem('token'))
        }
    })

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            token,
            setToken
        }}>
            <BrowserRouter>
                <MyNavbar/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;