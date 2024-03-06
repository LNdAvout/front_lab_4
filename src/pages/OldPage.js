// import React, {useContext, useEffect, useRef, useState} from "react";
// import Table from "../components/Table";
// import {AuthContext} from "../context/AuthContext";
// import axios from "axios";
// import "../App.css"
// import {Card} from "primereact/card";
// import {SelectButton} from "primereact/selectbutton";
// import {InputText} from "primereact/inputtext";
// import {Slider} from "primereact/slider";
// import {Button} from "primereact/button";
//
// function OldPage(effect, deps) {
//     const ref = useRef()
//     const WIDTH = 500
//     const HEIGHT = 500
//     const DPI_W = WIDTH * 2
//     const DPI_H = HEIGHT * 2
//     const RAZ = DPI_W / 60
//     const OTSTUP = 100
//     const DIVISION = (WIDTH - 100) / 5
//     const {isAuth, setIsAuth, token, setToken} = useContext(AuthContext)
//     const [points, setPoints] = useState([]);
//     const [rVal, setR] = useState(3);
//     const [isLoading, setIsLoading] = useState(false)
//     const [ctxVal, setCtxVal] = useState([])
//     const [valueX, setValueX] = useState(1)
//     const [valueR, setValueR] = useState(3);
//     const [valueY, setValueY] = useState(1);
//     let CANVAS
//     const itemsX = [
//         { name: '-3', value: -3 },
//         { name: '-2', value: -2 },
//         { name: '-1', value: -1 },
//         { name: '0', value: 0 },
//         { name: '1', value: 1 },
//         { name: '2', value: 2 },
//         { name: '3', value: 3 },
//         { name: '4', value: 4 },
//         { name: '5', value: 5 }
//     ];
//     const itemsR = [
//         { name: '-3', value: -3 },
//         { name: '-2', value: -2 },
//         { name: '-1', value: -1 },
//         { name: '0', value: 0 },
//         { name: '1', value: 1 },
//         { name: '2', value: 2 },
//         { name: '3', value: 3 },
//         { name: '4', value: 4 },
//         { name: '5', value: 5 }
//     ];
//     let axiosConfig = {
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Authorization': 'Bearer ' + token
//         }
//     };
//
//     const drawBase = (ctx) => {
//         ctx.beginPath()
//         ctx.strokeStyle = '#000000'
//         ctx.fillStyle = "#000000"
//         // Y
//         ctx.fillText('Y', DPI_W / 2 + RAZ, RAZ * 2);
//         // Ось Y
//         ctx.moveTo(DPI_W / 2, 0);
//         ctx.lineTo(DPI_W / 2, DPI_H);
//         // X
//         ctx.fillText('X', DPI_W - RAZ * 2, DPI_H / 2 - RAZ);
//         // Ось X
//         ctx.moveTo(0, DPI_H / 2);
//         ctx.lineTo(DPI_W, DPI_H / 2);
//
//         // Вертикальная стрелка
//         ctx.moveTo(DPI_W / 2, 0);
//         ctx.lineTo(DPI_W / 2 - RAZ / 2, RAZ * 2);
//         ctx.moveTo(DPI_W / 2, 0);
//         ctx.lineTo(DPI_W / 2 + RAZ / 2, RAZ * 2);
//
//         // Горизонтальная стрелка
//         ctx.moveTo(DPI_W, DPI_H / 2);
//         ctx.lineTo(DPI_W - RAZ * 2, DPI_H / 2 - RAZ / 2);
//         ctx.moveTo(DPI_W, DPI_H / 2);
//         ctx.lineTo(DPI_W - RAZ * 2, DPI_H / 2 + RAZ / 2);
//
//         // Горизонтальная разметка
//         for (let i = OTSTUP; i <= DPI_W - OTSTUP; i += DIVISION) {
//             ctx.moveTo(i, DPI_H / 2 - RAZ / 2);
//             ctx.lineTo(i, DPI_H / 2 + RAZ / 2);
//         }
//
//         // Вертикальная разметка
//         for (let i = OTSTUP; i <= DPI_H - OTSTUP; i += DIVISION) {
//             ctx.moveTo(DPI_W / 2 - RAZ / 2, i);
//             ctx.lineTo(DPI_W / 2 + RAZ / 2, i);
//         }
//
//         ctx.stroke()
//         ctx.closePath()
//     }
//
//     const drawShapes = (zeroX, zeroY, r, ctx) => {
//         const pixLength = r * 80
//         ctx.beginPath()
//         ctx.strokeStyle = '#42aaff'
//         ctx.fillStyle = "#42aaff"
//
//         // Квадрат
//         ctx.moveTo(zeroX, zeroY)
//         ctx.lineTo(zeroX - pixLength, zeroY)
//         ctx.lineTo(zeroX - pixLength, zeroY - pixLength)
//         ctx.lineTo(zeroX, zeroY - pixLength)
//         ctx.lineTo(zeroX, zeroY)
//         ctx.fill()
//
//         // Четверть окружности
//         ctx.arc(zeroX, zeroY, pixLength, 0, -Math.PI/2, true);
//         ctx.lineTo(zeroX, zeroY)
//         ctx.fill()
//
//         // Треугольник
//         ctx.moveTo(zeroX, zeroY)
//         ctx.lineTo(zeroX + pixLength, zeroY)
//         ctx.lineTo(zeroX, zeroY + pixLength / 2)
//         ctx.fill()
//
//         ctx.stroke()
//         ctx.closePath()
//         drawBase(ctx)
//     }
//
//     const clear = (ctx) => {
//         ctx.clearRect(0, 0, DPI_W, DPI_H);
//     }
//
//     const drawPoint = (ctx, x, y, isHit, pointR, r) => {
//         let popodanie = 0
//         if (isHit === 'Попадание') {
//             popodanie = 1
//         }
//         console.log(popodanie)
//         if (pointR === r) {
//             ctx.beginPath()
//             ctx.strokeStyle = '#000000'
//             if (popodanie === 0) {
//                 ctx.fillStyle = "#ff0000"
//             } else {
//                 ctx.fillStyle = "#00ff00"
//             }
//             ctx.arc(x, y, 10, 0, Math.PI * 2, true);
//             ctx.fill()
//             ctx.stroke()
//             ctx.closePath()
//         }
//     }
//     const setRad = (ctx, points) => {
//         clear(ctx)
//         drawShapes(WIDTH, HEIGHT, rVal, ctx)
//         console.log(points, "@@@@@@")
//         {points.map((point)=>
//             drawPoint(ctx, WIDTH + point.x * 80, HEIGHT - point.y * 80, point.hit, point.r, rVal)
//         )}
//     }
//
//     const handleChange = (event) => {
//         setR(event.target.value)
//     };
//
//     const addPoint = () => {
//
//     }
//
//     const clean = () => {
//
//     }
//
//     const drawCanvas = () => {
//         const ctx = CANVAS.getContext('2d')
//         CANVAS.style.width = WIDTH + 'px'
//         CANVAS.style.height = HEIGHT + 'px'
//         CANVAS.width = DPI_W
//         CANVAS.height = DPI_H
//         setCtxVal(ctx)
//         setRad(ctx)
//     }
//
//
//     useEffect(() => {
//         CANVAS = ref.current
//         loadPoints().then(res => points)
//     }, []);
//
//     const loadPoints = async () => {
//         const res = await axios.get("http://localhost:8080/demo/get", axiosConfig);
//         const points = res.data;
//         setPoints(points)
//         const ctx = CANVAS.getContext('2d')
//         CANVAS.style.width = WIDTH + 'px'
//         CANVAS.style.height = HEIGHT + 'px'
//         CANVAS.width = DPI_W
//         CANVAS.height = DPI_H
//         setCtxVal(ctx)
//         setRad(ctx, points)
//     }
//     return (
//         <div>
//                 <div className={"MainPage"}>
//                     <div className={"canvas"}>
//                         <canvas id="draw" ref={ref} />
//                     </div>
//                     <div className={"fields"}>
//                         <Card className={"data"}>
//                             <div><p>Выбор X</p></div>
//                             <div className=" flex justify-content-center">
//                                 <SelectButton className={"xselector"} value={valueX} onChange={(e) => setValueX(e.value)} optionLabel="name" options={itemsX} />
//                             </div>
//                             <div><p>Выбор Y</p></div>
//                             <div className="yselector flex justify-content-center">
//                                 <div className="w-14rem">
//                                     <InputText value={valueY} onChange={(e) => setValueY(e.target.value)} className="w-full" readOnly={true}  />
//                                     <Slider value={valueY} min={-3} max={5} onChange={(e) => setValueY(e.value)} className="w-full" />
//                                 </div>
//                             </div>
//                             <div><p>Выбор R</p></div>
//                             <div className="xselector flex justify-content-center">
//                                 <SelectButton value={valueR} onChange={handleChange} optionLabel="name" options={itemsR} />
//                             </div>
//                         </Card>
//                         <div className={"butti"}>
//                             <Button id="prov" label="Проверка" onClick={addPoint}/>
//                             <Button id="clean" label="Очистка" onClick={clean}/>
//                         </div>
//                     </div>
//                     <Table points={points}></Table>
//                 </div>
//         </div>
//     )
// }
//
// export default OldPage;