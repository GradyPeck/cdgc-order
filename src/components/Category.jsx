import Item from "./Item";

export default function Category({name, itemList, indent, update}) {

    const myItems = itemList.map((datum, i) => <Item key={i} entry={datum} indent={indent} update={update} />);

    return (
        <div className="at-Left" >
            <h4>{name}</h4>
            {myItems}
        </div>
    );
}