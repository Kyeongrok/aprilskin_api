var list = [
    {code:"P0000PM", item_no:"000A"},
    {code:"P0000TO", item_no:"000B"},
    {code:"P0000PP", item_no:"000H"}
];

//list to map

let getMap = (list) =>{
    let resultMap = {};
    list.forEach(function(item) {
        resultMap[item['code']+"-"+item['item_no']] = item;
    });
    return resultMap;
}

console.log(getMap(list));

function isNumber(obj) {
    return obj!== undefined && typeof(obj) === 'number' && !isNaN(obj);
}

function filterByCode(item) {
    if (isNumber(item.code)) {
        return true;
    }
    return false;
}

let hello = () =>{

}

var arrByCode = list.filter(filterByCode);

console.log(arrByCode);