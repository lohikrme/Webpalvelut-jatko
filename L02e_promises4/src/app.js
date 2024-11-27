// app.js

console.log("App starting...")

function button_A_click() {
    console.log("button A has been clicked!")

    // add the new script
    addScriptA()
    // call the function of the new script
    delayedFunctionCallA()
}

function addScriptA() {
    const newScript = document.createElement("script")
    newScript.src = "src/delayedScriptA.js"
    document.body.appendChild(newScript)
}


function button_B_click() {
    console.log("button B has been clicked!")
    // add the new script
    addScriptB(() => {
        delayedFunctionCallA()
    })
}

function addScriptB(callback) {
    const newScript = document.createElement("script")
    newScript.src = "src/delayedScriptA.js"
    document.body.appendChild(newScript)
    newScript.onload = callback
}


function button_C_click() {
    delayedFunctionCallA()
    const newScript = document.createElement("script")
    newScript.src = "src/delayedScriptB.js"
    document.body.appendChild(newScript)
}


function startPromiseButtonClick() {
    console.log("start promise button has been clicked!")
    loadScriptPromise()
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.error(error)
        })
}


function loadScriptPromise() {
    return new Promise((resolve, reject) => {
        const newScript = document.createElement("script")
        newScript.src = "src/delayedScriptA.js"
        document.body.appendChild(newScript)
        // return newscript source as data through the promise system
        newScript.onload = () => resolve(newScript.src)
        newScript.onerror = () => reject(new Error("Failed to load delayedScriptA.js"))
    })
}


async function startAsyncButtonClick() {
    const data = await loadScriptPromise()
    delayedFunctionCallA()
}