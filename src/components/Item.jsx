import { useEffect, useState } from "react";
import { currencyString } from "../util";

export default function Item({entry, indent, update}) {
    const[quant, setQuant] = useState(0);
    const[total, setTotal] = useState(0);
    const {cat, name, subname, unit, cost} = entry;

    useEffect(() => {
        setTotal(quant * cost);
        let longName = "";
        if(cat) longName = `${cat}: `;
        longName = longName + name;
        update(longName, quant, cost);
    }, [quant, cost, name, cat, update]);

    function validateInt(input) {
        const output = Number.parseInt(input);
        if(isNaN(output)) return 0;
        else return output;
    }

    function updateQuant(e) {
        setQuant(validateInt(e.target.value));
    }

    let nameEl;
    if(subname){ nameEl = 
        <span className={indent ? "indented-item" : "loose-item"}>
            <span>{name}</span>
            <em>{subname}</em>
        </span>;
    }
    else { nameEl = 
        <span className={indent ? "indented-item" : "loose-item"}>{name}</span>;
    }

    return (
        <div className="main-grid at-Left">
            {nameEl}
            <span className="unit">{unit}</span>
            <input className="quant-input" type="number" min="0" step="1" onChange={updateQuant}></input>
            <span className="center-text">{currencyString(cost)}</span>
            <span className="center-text">{total ? currencyString(total) : ""}</span>
            <hr />
        </div>
    );

    // condition ? A : B
    
}