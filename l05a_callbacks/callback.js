function getDate(callback) { 
    console.log("getDate function starts...")
    let date = new Date() 
    return callback(date)
} 

function dateToFinnishForm(dateObject) {
    console.log("dateToFinnishForm starts...")
    let d = dateObject.getDate()
    let m = dateObject.getMonth() + 1 
    let y = dateObject.getFullYear()
    finnishDate = `${d}.${m}.${y}`
    return `Date is ${finnishDate}`
}

console.log(getDate(dateToFinnishForm))