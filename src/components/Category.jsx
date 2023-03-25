import Item from "./Item";

export default function Category({name, itemList, indent, update}) {

    const myItems = itemList.map((datum, i) => {
        let datumPlus = Object.assign({}, datum);
        datumPlus["cat"] = name;
        return <Item key={i} entry={datumPlus} indent={indent} update={update} />
    });

    return (
        <div className="at-Left" >
            <h4 className="cat-name">{name}</h4>
            {myItems}
        </div>
    );
}