import LoginPage from "../pages/LoginPage";
import RegPage from "../pages/RegPage";
import OldPage from "../pages/OldPage";
import NewPage from "../pages/NewPage";


export const publicRoutes = [
    {id:'0', path: '/login', element:<LoginPage/>},
    {id:'1', path: '/reg', element:<RegPage/>},
]

export const privateRoutes = [
    {id:'0', path: '/main', element:<NewPage/>},
    {id:'1', path: '/new', element:<NewPage/>}
]