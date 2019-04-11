var empty = document.querySelector("body>div:first-child");
var table = document.querySelector("table");
var hour = document.getElementById("hour");
var min = document.getElementById("min");
var drink = document.getElementById("drink-value");

document.getElementById("add-btn").addEventListener("click", add);

init();
function init(){
    for (let index = 0; index < 24; index++) {
        let option = document.createElement("option");
        let value = index > 9 ? index : "0" + index;
        option.value = option.textContent = value;
        hour.appendChild(option);
    }
    for (let index = 0; index < 12; index++) {
        let option = document.createElement("option");
        let value = index > 1 ? index*5 : "05";
        option.value = value; option.textContent = value;
        min.appendChild(option);
    }
}

function add(){
    let value = drink.value;
    if(!/^\d+$/.test(value)){
        // alert("請輸入大於100cc的飲水量!");
        drink.value = "100";
        return;
    }

    if(value < 100){
        // alert("請輸入大於100cc的飲水量!");
        drink.value = "100";
        return;
    }

    if(table.querySelectorAll("tbody>tr").length == 0 ){
        table.classList.remove("hidden");
        empty.classList.add("hidden");
    }

    
    var row = table.querySelectorAll("tbody")[0].insertRow(table.querySelectorAll("tbody>tr").length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = hour.value + ":" + min.value;
    cell2.innerHTML = value;
    
    hour.selectedIndex = 0 ; min.selectedIndex = 0 ;
}

function toCurrency(num){
    var parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}