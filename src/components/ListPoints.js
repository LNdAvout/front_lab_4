import React from "react";
import Point from "./Point";

const ListPoints = ({points}) => {
    return (
        <tbody>
        {points.map((point, index)=>
                <Point point={point} index={index} key={point.id}/>
            )}
        </tbody>
    )
}

export default ListPoints