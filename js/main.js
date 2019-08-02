chrome.runtime.getBackgroundPage(function (bg) {
    var startPage = document.getElementById("start-page")
    var mainPage = document.getElementById("main-page")

    var empty = document.querySelector(".drink-list-empty")
    var table = document.querySelector(".drink-list")
    var hourElement = document.getElementById("hour")
    var minElement = document.getElementById("min")
    var drinkInput = document.getElementById("drink-value")
    var drinkData = []
    var mustDrink  = document.getElementById("mustDrink")
    var alreadyDrink  = document.getElementById("alreadyDrink")
    var remainingDrink  = document.getElementById("remainingDrink")
    var goalDrink = document.querySelector("#start-page>.title>input")
    document.getElementById("add-btn").addEventListener("click", add)
    document.getElementById("minus-btn").addEventListener("click", handleDrink.bind(null, 'minus'))
    document.getElementById("plus-btn").addEventListener("click", handleDrink.bind(null, 'plus'))
    document.getElementById("start-btn").addEventListener("click",startAction)

    function startAction(){
        mustDrink.textContent = goalDrink.value
        mainPage.classList.remove("hidden")
        startPage.classList.add("hidden")
        bg.bgService.dataService.init()
        init()
    }

    function init() {
        fetchData()
        for (let index = 0; index < 24; index++) {
            let option = document.createElement("option")
            let value = index > 9 ? index : "0" + index
            option.value = option.textContent = value
            hourElement.appendChild(option)
        }
        for (let index = 0; index < 12; index++) {
            let option = document.createElement("option")
            let value =  index * 5 < 10 ? "0" + String(index * 5) : index * 5 
            option.value = value; option.textContent = value
            minElement.appendChild(option)
        }
        initTime()
    }

    function calcDrink(){
        let reduceFunc = (a,b)=>{
            return {value:parseInt(a.value)+parseInt(b.value)}
        }
        let goal = parseInt(mustDrink.textContent)
        let sum = drinkData.length > 0 ? drinkData.reduce(reduceFunc).value : 0  ;
        alreadyDrink.textContent = sum
        remainingDrink.textContent = sum > goal ? 0 : goal - parseInt(sum)
    }
    
    function initTime() {
        let date = new Date(), hours, mins
        hours = date.getHours()
        mins = parseInt(date.getMinutes())
        while(mins % 5 != 0){
            mins--
        }
        hours = hours < 10 ? "0" + hours : hours
        mins = mins < 10 ? "0" + mins : mins
        hourElement.value = hours
        minElement.value = mins
    }
    
    function fetchData() {
        //取得清單
        drinkData = bg.bgService.dataService.get()
        calcDrink()
        let tbody = document.createElement('tbody')
        drinkData.forEach(item => {
            let row = document.createElement("tr")
            row.innerHTML = `<td>${item.time}</td><td>${item.value}</td>`
            row.ondblclick = function(){
                bg.bgService.dataService.delete(this.rowIndex-1)
                fetchData()
            }
            tbody.appendChild(row)
        })
        table.replaceChild(tbody, table.querySelector("tbody"))
        if (table.querySelectorAll("tbody>tr").length > 0) {
            table.classList.remove("hidden")
            empty.classList.add("hidden")
        }else{
            empty.classList.remove("hidden")
            table.classList.add("hidden")
        }
    }
    
    function handleDrink(arrow) {
        if (drinkInput.value <= 100 && arrow === 'minus') {
            drinkInput.value = "100"
            return
        }
        if(drinkInput.value > 9900){
            drinkInput.value = 9900 
            return 
        }
    
        if (arrow === 'minus')
            drinkInput.value = parseInt(drinkInput.value) - 100
        else
            drinkInput.value = parseInt(drinkInput.value) + 100
    }
    
    function add() {
        let value = drinkInput.value
    
        bg.bgService.dataService.add({
            time: hourElement.value + ":" + minElement.value,
            value: value
        })
        fetchData()
        initTime()
    }
    
    // function toCurrency(num) {
    //     var parts = num.toString().split('.')
    //     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    //     return parts.join('.')
    // }

    if(bg.bgService.dataService.haveTodayData()){
        mainPage.classList.remove("hidden")
        startPage.classList.add("hidden")
        init()
    }
})