import React, {useContext, useEffect, useRef} from "react";
import "../App.css"
import {useDispatch, useStore} from "react-redux";
import {setPoints} from "../actions";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
const Canvas = (props) => {
    const ref = useRef()
    const WIDTH = 500
    const HEIGHT = 500
    const DPI_W = WIDTH * 2
    const DPI_H = HEIGHT * 2
    const RAZ = DPI_W / 60
    const OTSTUP = 100
    const DIVISION = (WIDTH - 100) / 5
    let radius = 3
    let listPoints = []
    let CANVAS
    let navigate = useNavigate();
    const store = useStore()
    const dispatch = useDispatch();
    const {isAuth, setIsAuth, token, setToken} = useContext(AuthContext)
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        }
    };


    store.subscribe(() => {
        const state = store.getState()
        if (state.radius < 0) {
            radius = Math.abs(state.radius)
        } else {
            radius = state.radius
        }
        listPoints = state.points
        drawAll()
    })


    useEffect(() => {
        CANVAS = ref.current
        CANVAS.addEventListener('click', clickCanvas);
        listPoints = props.points
        drawAll()
        dispatch(setPoints(listPoints))
    }, []);

    const clickCanvas = (event) => {
        let rect = CANVAS.getBoundingClientRect()
        let x = (event.clientX - rect.left) * 2
        let y = (event.clientY - rect.top) * 2
        let znX = ((x - 500) / 80)
        let znY = ((500 - y) / 80)
        znX = znX.toString().slice(0, 8)
        znY = znY.toString().slice(0, 8)
        const coords = {
            x: znX,
            y: znY,
            r: radius
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
    }



    const uploadCoords = async (coords) => {
        return await axios.post("http://localhost:8080/demo/add", coords, axiosConfig)
    }

    const drawAll = () => {
        if (CANVAS == null) {
            console.log("NO")
        } else {
            const ctx = CANVAS.getContext('2d')
            CANVAS.style.width = WIDTH + 'px'
            CANVAS.style.height = HEIGHT + 'px'
            CANVAS.width = DPI_W
            CANVAS.height = DPI_H
            let r = radius
            clear(ctx)
            drawShapes(WIDTH, HEIGHT, r, ctx)
            {
                listPoints.map((point) =>
                    drawPoint(ctx, WIDTH + point.x * 80, HEIGHT - point.y * 80, point.hit, point.r, r)
                )
            }
        }
    }

    const drawBase = (ctx) => {
        ctx.beginPath()
        ctx.strokeStyle = '#000000'
        ctx.fillStyle = "#000000"
        // Y
        ctx.fillText('Y', DPI_W / 2 + RAZ, RAZ * 2);
        // Ось Y
        ctx.moveTo(DPI_W / 2, 0);
        ctx.lineTo(DPI_W / 2, DPI_H);
        // X
        ctx.fillText('X', DPI_W - RAZ * 2, DPI_H / 2 - RAZ);
        // Ось X
        ctx.moveTo(0, DPI_H / 2);
        ctx.lineTo(DPI_W, DPI_H / 2);

        // Вертикальная стрелка
        ctx.moveTo(DPI_W / 2, 0);
        ctx.lineTo(DPI_W / 2 - RAZ / 2, RAZ * 2);
        ctx.moveTo(DPI_W / 2, 0);
        ctx.lineTo(DPI_W / 2 + RAZ / 2, RAZ * 2);

        // Горизонтальная стрелка
        ctx.moveTo(DPI_W, DPI_H / 2);
        ctx.lineTo(DPI_W - RAZ * 2, DPI_H / 2 - RAZ / 2);
        ctx.moveTo(DPI_W, DPI_H / 2);
        ctx.lineTo(DPI_W - RAZ * 2, DPI_H / 2 + RAZ / 2);

        // Горизонтальная разметка
        for (let i = OTSTUP; i <= DPI_W - OTSTUP; i += DIVISION) {
            ctx.moveTo(i, DPI_H / 2 - RAZ / 2);
            ctx.lineTo(i, DPI_H / 2 + RAZ / 2);
        }

        // Вертикальная разметка
        for (let i = OTSTUP; i <= DPI_H - OTSTUP; i += DIVISION) {
            ctx.moveTo(DPI_W / 2 - RAZ / 2, i);
            ctx.lineTo(DPI_W / 2 + RAZ / 2, i);
        }

        ctx.stroke()
        ctx.closePath()
    }

    const drawShapes = (zeroX, zeroY, r, ctx) => {
        const pixLength = r * 80
        ctx.beginPath()
        ctx.strokeStyle = '#42aaff'
        ctx.fillStyle = "#42aaff"

        // Квадрат
        ctx.moveTo(zeroX, zeroY)
        ctx.lineTo(zeroX + pixLength, zeroY)
        ctx.lineTo(zeroX + pixLength, zeroY + pixLength)
        ctx.lineTo(zeroX, zeroY + pixLength)
        ctx.lineTo(zeroX, zeroY)
        ctx.fill()

        // Четверть окружности
        ctx.arc(zeroX, zeroY, pixLength / 2, -Math.PI, -3*Math.PI/2, true);
        ctx.lineTo(zeroX, zeroY)
        ctx.fill()

        // Треугольник
        ctx.moveTo(zeroX, zeroY)
        ctx.lineTo(zeroX - pixLength / 2, zeroY)
        ctx.lineTo(zeroX, zeroY - pixLength / 2)
        ctx.fill()

        ctx.stroke()
        ctx.closePath()
        drawBase(ctx)
    }

    const clear = (ctx) => {
        ctx.clearRect(0, 0, DPI_W, DPI_H);
    }

    const drawPoint = (ctx, x, y, isHit, pointR, r) => {
        let popodanie = 0
        if (isHit === 'Попадание') {
            popodanie = 1
        }
        if (pointR === r) {
            ctx.beginPath()
            ctx.strokeStyle = '#000000'
           if (popodanie === 0) {
                ctx.fillStyle = "#ff0000"
            } else {
                ctx.fillStyle = "#00ff00"
            }
            ctx.arc(x, y, 10, 0, Math.PI * 2, true);
            ctx.fill()
            ctx.stroke()
            ctx.closePath()
        }
    }

    return (
        <div className={"canvas"}>
            <canvas id="draw" ref={ref} />
        </div>
    )
}

export default Canvas