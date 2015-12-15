
function findAllSubsets(array){
    if (array.length <= 0) {
        temp.push([]);
        return;
    }
    else {findAllSubsets(array.slice(0, array.length-1));}
    temp.forEach(function(element, index, subset){
        var temporaryArray = temp[index];
        temporaryArray.push(array[array.length-1]);
        temp.push(temporaryArray);
    });
    return;
}

function returnTemp(){
    alert(temp);
}
var temp = [];
findAllSubsets([1, 2, 3]);
temp += "";
java.lang.System.out.println(temp);