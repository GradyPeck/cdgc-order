import Item from "./Item";

export default function Category({name, itemList}) {

    const myItems = itemList.map((datum, i) => {
        const keys = Object.keys(datum);
        if(keys.includes("name")) {
            return <Item key={i} entry={datum} />
        }
        else {
            const myName = keys[0];
            return <Category key={i} name={myName} itemList={datum[myName]} />
        }
    });

    return (
        <div>
            <p>{name}</p>
            {myItems}
        </div>
    )
}