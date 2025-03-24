export default function CountBox({displayIt, summation}) {
    let stringoo = "";
    for(let key in displayIt) {
        stringoo = stringoo + key + ", ";
    }

    return (
        <>
            {summation}
            <p>{stringoo}</p>
        </>
    );
}