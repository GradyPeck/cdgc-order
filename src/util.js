//create a string version of input number with appropriate decimal notation
export function currencyString(amount) {
    let costString = (amount / 100).toString();
    if(costString.includes(".")) {
        if(costString.length - costString.indexOf(".") === 2) costString += "0";
    }
    else costString += ".00";
    return "$" + costString;
}