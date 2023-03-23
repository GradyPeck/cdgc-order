import { useEffect, useState } from "react";
import { currencyString } from "../util";

export default function Item({entry, indent, update}) {
    const[quant, setQuant] = useState(0);
    const[total, setTotal] = useState(0);
    const {name, unit, cost} = entry;

    useEffect(() => {
        setTotal(quant * cost);
        update(name, quant, cost);
    }, [quant, cost, name, update]);

    function validateInt(input) {
        const output = Number.parseInt(input);
        if(isNaN(output)) return 0;
        else return output;
    }

    function updateQuant(e) {
        setQuant(validateInt(e.target.value));
    }

    return (
        <div className="main-grid at-Left">
            <span className={indent ? "indentedItem" : ""}>{name}</span>
            <span>{unit}</span>
            <input className="quant-input" type="number" min="0" step="1" onBlur={updateQuant} defaultValue={quant}></input>
            <span>{currencyString(cost)}</span>
            <span>{currencyString(total)}</span>
        </div>
    );

    // condition ? A : B
    
}