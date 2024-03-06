import React, {useState, useEffect} from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {useStore} from "react-redux";


const Table = (props) => {
    const [points, setPoints] = useState([])
    const store = useStore()

    useEffect(() => {
        setPoints(props.points)
    }, []);
    //
    store.subscribe(() => {
        const state = store.getState()
        setPoints(state.points)
    })

    return (
        <div className="Table">
            <DataTable id={"headTable"} value={points} stripedRows tableStyle={{ fontSize: '11px', maxWidth: '35rem', minWidth: '20rem' }}>
                <Column field="x" header="X"></Column>
                <Column field="y" header="Y"></Column>
                <Column field="r" header="R"></Column>
                <Column field="hit" header="HIT"></Column>
                <Column field="time" header="TIME"></Column>
                <Column field="scriptDuration" header="DURATION"></Column>
            </DataTable>
        </div>
    )
}

export default Table