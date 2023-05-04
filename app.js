import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings ={
    databaseURL: "https://playground-d5878-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListDB = ref(database, "shoppingList")

const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const shoppingList = document.getElementById("shopping-list")

addButton.addEventListener("click", ()=>{
    let inputVal = inputField.value
    push(shoppingListDB, inputVal)
    clearInputField()
})

onValue(shoppingListDB, function(snapshot){

    if(snapshot.exists()){

        let itemsArray = Object.entries(snapshot.val())

        clearShoppingList()

        for(let [key,item] of itemsArray){

            addItem(key,item)
        }
    } else{
        shoppingList.innerHTML = "List Completed!"
    }
})

//clears form
function clearInputField(){
    inputField.value = ""
}

//clear shoppingList
function clearShoppingList(){
    shoppingList.innerHTML = ""
}

//add new item to list
function addItem(key,item){
    let newItem = shoppingList.appendChild(document.createElement("li"))
    newItem.textContent = item

    //delete item if clicked
    newItem.addEventListener("click", function(){
        let itemLocation = ref(database, `shoppingList/${key}`)
        remove(itemLocation)
    })
}
