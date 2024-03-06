// const WIDTH = 500
// const HEIGHT = 500
// const DPI_W = WIDTH * 2
// const DPI_H = HEIGHT * 2
// const RAZ = DPI_W / 60
// const CANVAS = document.getElementById('draw')
// const ctx = CANVAS.getContext('2d')
// CANVAS.style.width = WIDTH + 'px'
// CANVAS.style.height = HEIGHT + 'px'
// CANVAS.width = DPI_W
// CANVAS.height = DPI_H
// let OTSTUP = 100
// let DIVISION = (WIDTH - 100) / 5
// ctx.font = "40px calibri";
// ctx.lineWidth = "3";
// const zeroX = DPI_W / 2
// const zeroY = DPI_H / 2
// let x = zeroX
// let y = zeroY
// let znX = 0
// let znY = 0
// let r = 2
// let kx = 0
// let ky = 0
// let popodanie = -1
// let vvx = 0
// let vvy = 0
//
//
// CANVAS.onclick = function (evt) {
//     let rect = this.getBoundingClientRect()
//     x = (evt.clientX - rect.left) * 2
//     y = (evt.clientY - rect.top) * 2
//     znX = ((x - 500) / 80)
//     znY = ((500 - y) / 80)
//     //console.log([x, y, znX, znY])
//     if (isNumericX() && isNumericY()) {
//         ctx.fillStyle = "black"
//         kx = 1
//         ky = 1
//         setX(znX)
//         setY(znY)
//         let button = document.getElementById('form:butt1');
//         button.click()
//     }
// }
//
//
//
// function drawBase() {
//     ctx.beginPath()
//     ctx.strokeStyle = '#000000'
//     ctx.fillStyle = "#000000"
//     // Y
//     ctx.fillText('Y', DPI_W / 2 + RAZ, RAZ * 2);
//     // Ось Y
//     ctx.moveTo(DPI_W / 2, 0);
//     ctx.lineTo(DPI_W / 2, DPI_H);
//     // X
//     ctx.fillText('X', DPI_W - RAZ * 2, DPI_H / 2 - RAZ);
//     // Ось X
//     ctx.moveTo(0, DPI_H / 2);
//     ctx.lineTo(DPI_W, DPI_H / 2);
//
//     // Вертикальная стрелка
//     ctx.moveTo(DPI_W / 2, 0);
//     ctx.lineTo(DPI_W / 2 - RAZ / 2, RAZ * 2);
//     ctx.moveTo(DPI_W / 2, 0);
//     ctx.lineTo(DPI_W / 2 + RAZ / 2, RAZ * 2);
//
//     // Горизонтальная стрелка
//     ctx.moveTo(DPI_W, DPI_H / 2);
//     ctx.lineTo(DPI_W - RAZ * 2, DPI_H / 2 - RAZ / 2);
//     ctx.moveTo(DPI_W, DPI_H / 2);
//     ctx.lineTo(DPI_W - RAZ * 2, DPI_H / 2 + RAZ / 2);
//
//     // Горизонтальная разметка
//     for (let i = OTSTUP; i <= DPI_W - OTSTUP; i += DIVISION) {
//         ctx.moveTo(i, DPI_H / 2 - RAZ / 2);
//         ctx.lineTo(i, DPI_H / 2 + RAZ / 2);
//     }
//
//     // Вертикальная разметка
//     for (let i = OTSTUP; i <= DPI_H - OTSTUP; i += DIVISION) {
//         ctx.moveTo(DPI_W / 2 - RAZ / 2, i);
//         ctx.lineTo(DPI_W / 2 + RAZ / 2, i);
//     }
//
//     ctx.stroke()
//     ctx.closePath()
// }
//
// function drawShapes() {
//     const pixLength = r * 80
//     ctx.beginPath()
//     ctx.strokeStyle = '#42aaff'
//     ctx.fillStyle = "#42aaff"
//
//     // Квадрат
//     ctx.moveTo(zeroX, zeroY)
//     ctx.lineTo(zeroX - pixLength, zeroY)
//     ctx.lineTo(zeroX - pixLength, zeroY - pixLength)
//     ctx.lineTo(zeroX, zeroY - pixLength)
//     ctx.lineTo(zeroX, zeroY)
//     ctx.fill()
//
//     // Четверть окружности
//     ctx.arc(zeroX, zeroY, pixLength, 0, -Math.PI/2, true);
//     ctx.lineTo(zeroX, zeroY)
//     ctx.fill()
//
//     // Треугольник
//     ctx.moveTo(zeroX, zeroY)
//     ctx.lineTo(zeroX + pixLength, zeroY)
//     ctx.lineTo(zeroX, zeroY + pixLength / 2)
//     ctx.fill()
//
//     ctx.stroke()
//     ctx.closePath()
//     drawBase()
// }
//
//
// function drawPoint() {
//     ctx.beginPath()
//     ctx.strokeStyle = '#000000'
//     if (popodanie === -1) {
//         ctx.fillStyle = "#ffC0CB"
//     } else if (popodanie === 0) {
//         ctx.fillStyle = "#ff0000"
//     } else {
//         ctx.fillStyle = "#00ff00"
//     }
//     ctx.arc(x, y, 10, 0, Math.PI * 2, true);
//     ctx.fill()
//     ctx.stroke()
//     ctx.closePath()
// }
//
// function clear () {
//     ctx.clearRect(0, 0, DPI_W, DPI_H);
// }
//
//
//
// function setX (val) {
//     kx = 1
//     znX = val
//     val = val.toString().slice(0, 8)
//     document.getElementById("form:txt1").value = val;
//     x = zeroX  + val * 80
//     popodanie = -1
//     clear()
//     drawShapes()
// }
//
// function setY (val) {
//     val = val.toString().slice(0, 8)
//     znY = val
//     document.getElementById("form:ynum").value = val;
//     ky = 1
//     y = zeroY  - parseFloat(znY) * 80
//     popodanie = -1
//     clear()
//     drawShapes()
// }
//
// export function setR (val) {
//     r = val
//     popodanie = -1
//     clear()
//     drawShapes()
// }
// setR(1)
// //document.getElementById('form:txt1').disabled = true
// //document.getElementById('form:txt3').disabled = true
//
//
// function isNumericY() {
//     return (/^\-?\d+\.?\d{0,}$/g.test(znY) && znY > -5 && znY < 5)
// }
// function isNumericX() {
//     return (/^\-?\d+\.?\d{0,}$/g.test(znX) && znX >= -4 && znX <= 4)
// }
//
// export function prover(jsonArray){
//     for (let i = jsonArray.length - 1; i >= 0; i--) {
//         x = zeroX  + jsonArray[i].x * 80
//         y = zeroY  - jsonArray[i].y * 80
//         popodanie = -1
//         if (jsonArray[i].hit === "Попадание"){
//             popodanie = 1
//         }
//         if (jsonArray[i].hit === "Промах"){
//             popodanie = 0
//         }
//         if (r === jsonArray[i].r){
//             drawPoint();
//         }
//     }
// }
