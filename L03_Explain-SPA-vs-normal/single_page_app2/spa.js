

// Group name: Lonely Parrot
// Tekijät: 1kpl
// Nimi: Joonas Harjula
// Opiskelijanumero: 2200672

// NOW ANALYZE SPA.JS FILE, AND THEN COMPARE TO MAIN.JS FILE:

// BRIEF EXPLANATION HOW THIS CODE WORKS:
//    * When this file is read first time, it sends a GET request to backend service
//    * when data is received successfully, it is stored into the 'notes' array,
//    * which is also  used to draw the data into the website.
//    * The other thing done at the first time of reading this file
//    * is adding a kind of (not exactly) eventlistener to the html form,
//    * which receives new notes, so each time user adds a new note
//    * the new note is pushed into notes array.
//    * 
//    * Both at the first reading of this file, and every time submit button is pressed,
//    * redrawNotes() function is called, which removes old data
//    * and uses the latest 'notes' array's content to draw the new data.
//    * So basically, the notes becomes dynamic, but it is fetched only once at onload
//    * from the database, though it is updated many times towards the database.

// BRIEF COMPARISON OF MAIN.JS AND SPA.JS LOGIC:
//    * So, the main.js file will refresh the whole website
//    * every time a user clicks the submit button. 
//    * This requires a lot more network cache and processing power and resources.
//    * So, it does not just separately do a post request and say on the website.
//    * But after post request it reloads the website, and all its content.
//    * To add data, we also do both post request to first add data,
//    * and then GET request to get the new data into the website view.
//    * 
//    * This approach is very different to spa.js, which prevents reloading website, 
//    * and basically fetch data just at initial load from the backend database using GET.
//    * After the initial GET request, spa.js will use the dynamic array to
//    * save the new notes inside the array same time as it saves them into the database.
//    * And then it will rewrite the element, that is in charge of drawing the notes array.
//    * 
//    * Therefore, spa.js file is so called single page application. The view changes,
//    * but we stay on the same website.
//    * In princible also the main.js is a bit like a single page application.
//    * But main.js reloads the same page over again and again.
//    * The code of spa.js is more complex, but it saves resources by avoiding reloads.

// LONG EXPLANATION (read only if want to see the thought process):

// window.onload(function (event) {})
//    * after loading, we start listening the html element 'notes_form'
//    * if form tries to submit something, we preventDefault, 
//    * which basically means preventing actual reload of the site.
//    * then we use the notes array, and push there a javascript-object data including 
//    * the content and the date of a note
//    * ' e.target.elements[0].value ' is a reference to form, because
//    * the event is to submit the form. so, during submit the form, 
//    * we take and reset value using the ref event.target.elements[0]
//    * finally we summon redrawNotes() function and sendServer() function

// redrawNotes(): 
//    * this function creates unordered list element, gives it class 'notes'
//    * then it goes through the array 'notes' that contains js-object data
//    * and makes list items from every single js-object data using createTextNode
//    * and note.content is reference to the content which is written into list item
//    * after this, the html div with id 'notes' is selected
//    * and if it is not empty, it is emptied, before appending the unordered list

// sendToServer(): 
//    * this function receives a single note (js object data) as param
//    * then it creates an AJAX object using XMLHttpRequest class
//    * and uses the object to send note to
//    * '/exampleapp/new_note_spa' endpoint
//    * js object is stringified first using JSON.parse() function
//    * also listens for 201 answer as sign a new note was added successfully to database

// xhttp.onreadystatechange:
//    * this is the other AJAX object of this file
//    * when spa.js file is read first time, there is instantly
//    * called xhttp.open(), which is ajax way to send request
//    * so, xhttp object sends GET request into "/exampleapp/data.json"
//    * which is the backend service of this application
//    * there is also xhttp.onreadystatechange() function
//    * which listens for answer 200 from the get request
//    * and when 200 is given, stores received response's data into notes array
//    * and then calls the redrawnotes function, that uses the notes array
//    * to append the notes as unordered list into the html file



var notes = []

var redrawNotes = function() {
  var ul = document.createElement('ul')
  ul.setAttribute('class', 'notes')

  notes.forEach(function (note) {
    var li = document.createElement('li')

    ul.appendChild(li);
    li.appendChild(document.createTextNode(note.content))
  })

  var notesElement = document.getElementById("notes")
  if (notesElement.hasChildNodes()) {
    notesElement.removeChild(notesElement.childNodes[0]);
  }
  notesElement.appendChild(ul)
}

var xhttp = new XMLHttpRequest()

xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    notes = JSON.parse(this.responseText)
    redrawNotes()
  }
}

xhttp.open("GET", "/exampleapp/data.json", true)
xhttp.send()

var sendToServer = function (note) {
  var xhttpForPost = new XMLHttpRequest()
  xhttpForPost.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      console.log(this.responseText)
    }
  }

  xhttpForPost.open("POST", '/exampleapp/new_note_spa', true)
  xhttpForPost.setRequestHeader("Content-type", "application/json")
  xhttpForPost.send(JSON.stringify(note));
}

window.onload = function (e) {
  var form = document.getElementById("notes_form")
  form.onsubmit = function (e) {
    e.preventDefault()

    var note = {
      content: e.target.elements[0].value,
      date: new Date()
    }

    notes.push(note)
    e.target.elements[0].value = ""
    redrawNotes()
    sendToServer(note)
  }
}
