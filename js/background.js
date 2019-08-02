Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('');
};

class DataService {

    drinkList = []

    constructor() {
        try {
            //是否存在
            if (window.localStorage.getItem("drinkList") && window.localStorage.getItem("today")) {
                if (this.now() == window.localStorage.getItem("today")) {
                    this.drinkList = JSON.parse(window.localStorage.getItem("drinkList"))
                } else {
                    throw null
                }
            } else {
                throw null
            }
        } catch (e) {
            window.localStorage.clear();
            window.localStorage.setItem("today", undefined);
            window.localStorage.setItem("drinkList", "[]");
            this.drinkList = [];
        }
    }

    init(){
        window.localStorage.setItem("today", this.now());
    }

    get() {
        return this.drinkList
    }

    add(item) {
        this.drinkList.push(item)
        window.localStorage.setItem("drinkList", JSON.stringify(this.drinkList))
    }
    
    delete(index){
        this.drinkList.splice(index,1);
        window.localStorage.setItem("drinkList", JSON.stringify(this.drinkList))
    }

    now(){
        let date = new Date();
        let mm = date.getMonth() + 1; // getMonth() is zero-based
        let dd = date.getDate();
    
        return [date.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
        ].join('');
    }

    haveTodayData(){
        let today =  window.localStorage.getItem("today")
        return this.now() == today
    }
}

const dataService = new DataService;
window.bgService = {
    dataService: dataService
};