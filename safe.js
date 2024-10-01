let orderListLabel = document.querySelector('.orderListLabel')
let body = document.querySelector('body')
let closeOrderTab = document.querySelector('.closeBtn')

let drinkList = document.getElementsByClassName('softDrinks')[0]
let drinkPage  = document.getElementsByClassName('drinkPage')[0]
let fridgeWelcome = document.getElementsByClassName('fridgeWelcome')[0]
let fridgeKey = document.getElementsByClassName('fridgeKey')[0]

let drinkOrder = document.getElementsByClassName('drinkOrder')[0]
let orderList = document.querySelector('.orderList')

let minerals = document.querySelectorAll('.minerals img')
let drinkOrderDone = document.getElementById('drinkOrderDone')
let drinkFrom = document.forms['drinkForm']
let orderPage = document.getElementsByClassName('orderPage')[0]
let totalInOrderContainer  = document.querySelector('.totalInOrder')
let totalInOrder = document.querySelector('.totalInOrder span')

let softDrinksContainer = [];
let orderThis = []
let orderIcon = document.querySelector('.order-icon')
orderIcon.addEventListener('click', () => {
    body.classList.toggle('showOrderItemsContainer')
})
  
closeOrderTab.addEventListener('click', () => {
    body.classList.toggle('showOrderItemsContainer')
})

document.addEventListener('DOMContentLoaded', () => {
    window.onload = function () {
        fridgeWelcome.style.top = '0'
    }
    
    fridgeKey.addEventListener('click', () => {
        fridgeWelcome.style.top = '-100%'
    })

    // document.getElementsByTagName('mark')[0]
    // .addEventListener('click', (event) => {
    //     const btnHere2 = event.target
    //     btnHere2.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.scale = '0'
    //     drinkPage.style.zIndex = '1'
    //     fridgeWelcome.style.top = '-100%'
    // })
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
    addToOrderPageHTML()
    addOrderToMemory()
}

const addOrderToMemory = () => {
    localStorage.setItem('justOneOrder', JSON.stringify(orderThis))
}
const addToOrderPageHTML = () => {
    orderList.innerHTML = ""
    let totalQuantity = 0;
    let grandTotal = 0
    if(orderThis.length > 0){
        orderThis.forEach(justOneOrder => {
            totalQuantity = totalQuantity + justOneOrder.quantity
            let theNewOrder = document.createElement('div')
            theNewOrder.classList.add('singleOrder')
            theNewOrder.dataset.id = justOneOrder.drink_id
            let thisOrderPosition = softDrinksContainer.findIndex((value) => value.id == justOneOrder.drink_id)
            let orderPosition = softDrinksContainer[thisOrderPosition]

            grandTotal = grandTotal + orderPosition.price * justOneOrder.quantity
            theNewOrder.innerHTML = `
                <div class="itemImage">
                    <img src="${orderPosition.image}" alt="">
                </div>
                <div class="itemName">${orderPosition.name}</div>
                <div class="itemPrice">$${orderPosition.price * justOneOrder.quantity}</div>
                <div class="quantity">
                    <span class="minusBtn"><i class="fa-solid fa-minus  influencer"></i></span>
                    <span class="itemQuantity">${justOneOrder.quantity}</span>
                    <span class="plusBtn"><i class="fa-solid fa-plus influencer"></i></span>
                </div>`
            orderList.appendChild(theNewOrder)
        })
    }
    orderListLabel.innerText = totalQuantity
    totalInOrder.innerHTML ='$'+ grandTotal.toFixed(2) 
}

orderList.addEventListener('click', (event) => {
    let positionClicked = event.target
    if(positionClicked.classList.contains('fa-minus') || positionClicked.classList.contains('fa-plus')) {
        let drink_id = positionClicked.parentElement.parentElement.parentElement.dataset.id
        let type = "fa-minus"
        if(positionClicked.classList.contains('fa-plus')) {
            type = 'fa-plus'
        }
        changeOrderQuantity(drink_id, type)
    }
})

const changeOrderQuantity = (drink_id, type) => {
    let positionOfItemInOrderList = orderThis.findIndex((value) => value.drink_id == drink_id)
    if (positionOfItemInOrderList >= 0) {
        switch (type) {
            case 'fa-plus':
                orderThis[positionOfItemInOrderList].quantity = orderThis[positionOfItemInOrderList].quantity + 1
                break;
        
            default:
                let orderValueChanged = orderThis[positionOfItemInOrderList].quantity - 1
                if (orderValueChanged > 0) {
                    orderThis[positionOfItemInOrderList].quantity = orderValueChanged
                } else {
                    orderThis.splice(positionOfItemInOrderList, 1)
                }
                break;
        }
    }
    addOrderToMemory()
    addToOrderPageHTML()
}


// const orderGrandTotal = (price, quantity) => {
//     let price * justOneOrder.quantity = orderPosition.price * justOneOrder.quantity + 1
//     totalInOrder.innerHTML = totalQuantity
// }


const initApp = () => {
    // get data from drinks.json
    fetch('drinks.json')
    .then(response => response.json())
    .then(data => {
        softDrinksContainer = data;
        addDrinksToHTML()

        // get order from memory
        if(localStorage.getItem('justOneOrder')) {
           orderThis = JSON.parse(localStorage.getItem('justOneOrder'))
           addToOrderPageHTML()
        }
    })
}

initApp()
