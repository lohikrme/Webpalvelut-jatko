
// Group name: Lonely Parrot
// Tekijät: 1kpl
// Nimi: Joonas Harjula
// Opiskelijanumero: 2200672

// NOW ANALYZE MAIN.JS FILE

// BRIEF EXPLANATION HOW THIS CODE WORKS:
//    * During first load of website, there is created a new AJAX object
//    * then this object sends a GET request to a backend endpoint called 
//    * "/exampleapp/data.json"
//    * After the response is finished, the code creates a new unordered list.
//    * and goes through the response data with forEach loop, 
//    * and then creates list items with 
//    * textNodes that contain only content (not date)
//    * When the html website submit button is clicked, 
//    * the default behaviour of HTML is to reload the website
//    * when there is done a POST, PUT, DELETE or similar modifying request
//    * and the request is accepted.
//    * That could be maybe blocked by using event.preventDefault() function
//    * but it is intentionally left as it is, because now when submit
//    * button is clicked and answer is 201, the website will fully reload,
//    * reading again this main.js file, making again a new AJAX object
//    * and sending again a new GET request to the backend server
//    * therehow drawing information that is always first requested from backend.

// Sources:
//    * https://www.w3schools.com/XML/ajax_intro.asp
//    * https://javascript.info/



var xhttp = new XMLHttpRequest()

xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText)
    console.log(data)

    var ul = document.createElement('ul')
    ul.setAttribute('class', 'notes')

    data.forEach(function(note){
      var li = document.createElement('li')
      
      ul.appendChild(li);
      li.appendChild(document.createTextNode(note.content))
    })

    document.getElementById("notes").appendChild(ul)
  }
}

xhttp.open("GET", "/exampleapp/data.json", true)
xhttp.send()