import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings ={
    databaseURL: "https://playground-d5878-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListDB = ref(database, "shoppingList")


const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")

addButton.addEventListener("click", ()=>{
    let inputVal = inputField.value
    push(shoppingListDB, inputVal)
})
