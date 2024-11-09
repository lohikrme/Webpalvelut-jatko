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