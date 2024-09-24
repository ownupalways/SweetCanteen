let orderIcon = document.querySelector('.order-icon')
let body = document.querySelector('body')
let closeOrderTab = document.querySelector('.closeBtn')

let drinkList = document.getElementsByClassName('softDrinks')[0]
let drinkPage  = document.getElementsByClassName('drinkPage')[0]
let fridgeWelcome = document.getElementsByClassName('fridgeWelcome')[0]
let fridgeKey = document.getElementsByClassName('fridgeKey')[0]

let drinkOrder = document.getElementsByClassName('drinkOrder')[0]

let minerals = document.querySelectorAll('.minerals img')
let drinkOrderDone = document.getElementById('drinkOrderDone')
let drinkFrom = document.forms['drinkForm']
let orderPage = document.getElementsByClassName('orderPage')[0]

orderIcon.addEventListener('click', () => {
    body.classList.toggle('showOrderItemsContainer')
})

closeOrderTab.addEventListener('click', () => {
    body.classList.toggle('showOrderItemsContainer')
})

let softDrinksContainer = [];
let orderThis = []

document.addEventListener('DOMContentLoaded', () => {
    window.onload = function () {
        fridgeWelcome.style.top = '0'
    }
    
    fridgeKey.addEventListener('click', () => {
        fridgeWelcome.style.top = '-100%'
    })
})

for (let i = 0; i < minerals.length; i++) {
    const thisMineral = minerals[i];
    thisMineral.addEventListener('click', () =>{
            console.log(thisMineral)
            // let addMineral = document.getElementById('thisOne')
            drinkOrder.style.scale = '1'
            drinkPage.style.zIndex = '0'
    })
}


function submitMe(event) {
    const btnHere = event.target
    btnHere.parentElement.style.scale = '0'
    drinkPage.style.zIndex = '1'
    fridgeWelcome.style.top = '-100%'
}

document.getElementsByTagName('mark')[0]
.addEventListener('click', (event) => {
    const btnHere2 = event.target
    btnHere2.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.scale = '0'
    drinkPage.style.zIndex = '1'
    fridgeWelcome.style.top = '-100%'
})

const addDrinksToHTML = () => {
    drinkList.innerHTML = ''
    if (softDrinksContainer.length > 0) {
        softDrinksContainer.forEach(thisDrink => {
            let newDrink = document.createElement('div')
            newDrink.classList.add('drinkLabel')
            newDrink.dataset.id = thisDrink.id 
            newDrink.innerHTML = `
                <div class="minerals">
                    <img src="${thisDrink.image}" class="thisOne">
                </div>
                <h4 style="text-align: center; padding: 10px;">${thisDrink.name}</h4> `;
                drinkList.appendChild(newDrink)
        })
    }
}

drinkList.addEventListener('click', (e) => {
    let drinkClicked = e.target
    if(drinkClicked.classList.contains('thisOne')) {
        let drinkId = drinkClicked.parentElement.parentElement.dataset.id
        moveToOrderPage(drinkId)
    }
})

const moveToOrderPage = (drinkId) => {
    let checkForThisItemInOrder = orderThis.findIndex((value) => value.drink_id == drinkId)
    if(orderThis.length <= 0) {
        orderThis = [{
            drink_id: drinkId,
            quantity: 1
        }]
    }else if (checkForThisItemInOrder < 0) {
        orderThis.push({
            drink_id: drinkId,
            quantity: 1
        })
    }else {
        orderThis[checkForThisItemInOrder].quantity = orderThis[checkForThisItemInOrder].quantity + 1
    }
    console.log(orderThis)
}
const initApp = () => {
    // get data from drinks.json
    fetch('drinks.json')
    .then(response => response.json())
    .then(data => {
        softDrinksContainer = data;
        addDrinksToHTML()
    })
}

initApp()
