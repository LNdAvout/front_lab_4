import React, {useContext, useState} from "react";
import "../App.css"
import {Slider} from 'primereact/slider';
import {Card} from 'primereact/card';
import {InputText} from "primereact/inputtext";
import {SelectButton} from 'primereact/selectbutton';
import {Button} from "primereact/button";
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom';
import {setNewRadius, setPoints} from '../actions.js'
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

const InputFields = () => {
    let navigate = useNavigate();
    const [valueX, setValueX] = useState(1);
    const [valueR, setValueR] = useState(3);
    const [valueY, setValueY] = useState(1);
    const itemsX = [
        { name: '-3', value: -3 },
        { name: '-2', value: -2 },
        { name: '-1', value: -1 },
        { name: '0', value: 0 },
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 }
    ];
    const itemsR = [
        { name: '-3', value: -3 },
        { name: '-2', value: -2 },
        { name: '-1', value: -1 },
        { name: '0', value: 0 },
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 }
    ];
    const dispatch = useDispatch();
    const {isAuth, setIsAuth, token, setToken} = useContext(AuthContext)
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        }
    };


    const handleR = (event) => {
        let val = valueR
        if (event.target.value != null) {
            val = event.target.value
        }
        setValueR(val)
        dispatch(setNewRadius(val))
    }
    const handleX = (event) => {
        let val = valueX
        if (event.target.value != null) {
            val = event.target.value
        }
        setValueX(val)
    }

    const printProverka = (vaar) => {
        console.log(vaar)
    }

    const addPoint = (e) => {
        e.preventDefault()
        const coords = {
            x: valueX,
            y: valueY,
            r: valueR
        }
        uploadCoords(coords).then((res) => {
            dispatch(setPoints(res.data))
            navigate('/main')
        })
            .catch((error) => {
                setToken('')
                localStorage.setItem('token', '')
                setIsAuth(false)
                localStorage.removeItem('auth')
                navigate('/login', { replace: true })
            });
        //dispatch(setCoords(coords))
    }

    const clean = (e) => {
        e.preventDefault()
        cleanPoints().then((res) => {
            dispatch(setPoints([]))
            navigate('/main')
        })
            .catch((error) => {
                setToken('')
                localStorage.setItem('token', '')
                setIsAuth(false)
                localStorage.removeItem('auth')
                navigate('/login', { replace: true })
            })
    }

    const cleanPoints = async () => {
        return await axios.delete("http://localhost:8080/demo/delete", axiosConfig)
    }
    const uploadCoords = async (coords) => {
        return await axios.post("http://localhost:8080/demo/add", coords, axiosConfig)
    }


    return (
        <div className={"fields"}>
            <Card className={"data"}>
                <div><p>Выбор X</p></div>
            <div className=" flex justify-content-center">
                <SelectButton className={"xselector"} value={valueX} onChange={handleX} optionLabel="name" options={itemsX} />
            </div>
                <div><p>Выбор Y</p></div>
            <div className="yselector flex justify-content-center">
                <div className="w-14rem">
                    <InputText value={valueY} onChange={(e) => setValueY(e.target.value)} className="w-full" readOnly={true}  />
                    <Slider value={valueY} min={-3} max={5} onChange={(e) => setValueY(e.value)} className="" />
                </div>
            </div>
                <div><p>Выбор R</p></div>
            <div className="xselector flex justify-content-center">
                <SelectButton value={valueR} onChange={handleR} optionLabel="name" options={itemsR} />
            </div>
            </Card>
            <div className={"butti"}>
                <Button id="prov" label="Проверка" onClick={addPoint}/>
                <Button id="clean" label="Очистка" onClick={clean}/>
            </div>
        </div>
    )
}

export default InputFields