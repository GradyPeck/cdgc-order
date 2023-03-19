export default function Item({entry}) {
    const {name, unit, cost} = entry;

    //create a string version of cost with appropriate decimal notation
    let costString = (cost / 100).toString();
    if(costString.includes(".")) {
        if(costString.length - costString.indexOf(".") === 2) costString += "0";
    }
    else costString += ".00";

    return (
        <p className="main-grid">
            <span>{name}</span>
            <span>{unit}</span>
            <span>${costString}</span>
        </p>
    );
}