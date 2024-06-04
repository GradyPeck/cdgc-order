
export default function SummaryItem({myText, indents}) {
    let myClass = "summary-item";
    if(indents == 1) myClass += " summary-indent";
    else if(indents == 2) myClass += " summary-double-indent";

    return (
        <p className={myClass}>{myText}</p>
    );
}