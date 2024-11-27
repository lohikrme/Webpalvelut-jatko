// app.js

console.log("App starting...")

function startButtonClick() {
    console.log("button has been clicked!")

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