import React, {useContext, useEffect, useState} from "react";
import Canvas from "../components/Canvas";
import InputFields from "../components/InputFields";
import "../App.css"
import Table from "../components/Table";
import {useDispatch, useSelector, useStore} from "react-redux";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {setPoints} from "../actions";
import {useNavigate} from "react-router-dom";

function NewPage() {
    let navigate = useNavigate();
    const [points, setPoints] = useState([]);
    const [valueR, setValueR] = useState(3);
    const [isLoad, setIsLoad] = useState(false);
    const {isAuth, setIsAuth, token, setToken} = useContext(AuthContext)
    const dispatch = useDispatch();
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        }
    };
    // let valueR = 2
    // const store = useStore()

    // store.subscribe(() => {
    //     setIsLoad(true)
    //     const state = store.getState()
    //     if (state.radius < 0) {
    //         setValueR(Math.abs(state.radius))
    //     } else {
    //         setValueR(state.radius)
    //     }
    //     //console.log(state.radius)
    //     //setIsLoad(false)
    //     setTimeout(() => {
    //         console.log(valueR)
    //         setIsLoad(false)
    //     }, 5)
    // })

    // const updateAll = () => {
    //     const state = store.getState()
    //     valueR = state.radius
    //     console.log(valueR)
    // }

    // store.subscribe(() => {
    //     setIsLoad(true)
    //     loadAll().then(
    //         (result) => {
    //             setIsLoad(false)
    //         })
    // })

    useEffect(() => {
        setIsLoad(true)
        loadAll().then(
            (result) => {
                const points = result.data;
                setPoints(points)
                setIsLoad(false)
            })
            .catch((error) => {
                setToken('')
                localStorage.setItem('token', '')
                setIsAuth(false)
                localStorage.removeItem('auth')
                navigate('/login', { replace: true })
            });
    }, []);

    const loadAll = async () => {
        return await axios.get("http://localhost:8080/demo/get", axiosConfig);
    }

    return (
        <div>
            {isLoad
                ?
                <div>
                    <h1>Загрузка...</h1>
                </div>
                :
                    <div className={"MainPage"}>
                        <Canvas points={points} r={valueR}></Canvas>
                        <InputFields/>
                        <Table points={points}></Table>
                    </div>
            }

        </div>
    )
}

export default NewPage