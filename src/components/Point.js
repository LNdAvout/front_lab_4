import React from "react";
import {Column} from "primereact/column";

const Point = (props) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.point.x}</td>
            <td>{props.point.y}</td>
            <td>{props.point.r}</td>
            <td>{props.point.hit}</td>
            <td>{props.point.time}</td>
            <td>{props.point.scriptDuration}</td>
        </tr>
    )
}

export default Point