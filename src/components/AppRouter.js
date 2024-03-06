import React, {useContext} from "react";
import {Route, Routes} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import NewPage from "../pages/NewPage";
import {publicRoutes, privateRoutes} from "../router/routes";
import {AuthContext} from "../context/AuthContext";

const AppRouter = () => {
    const {isAuth, token} = useContext(AuthContext)
    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                        key={route.id}
                    />
                )}
                <Route path={"*"} element={<NewPage/>}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                        key={route.id}
                    />
                )}
                <Route path={"*"} element={<LoginPage/>}/>
            </Routes>
    )
}

export default AppRouter