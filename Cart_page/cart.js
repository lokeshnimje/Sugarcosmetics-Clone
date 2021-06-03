/* ---------------------------------------------Cart Code starts here----------------------------------------------- */

window.addEventListener('load', execute)

let display = document.querySelector('.added_items')
let bill_amt = document.getElementById('bill_amt')
let total_amt = document.getElementById('total_amt')
let cart_active = document.querySelector('.cart_active')

function execute(e){
    e.preventDefault()
    getPurchaseData()
}

let checkout = document.getElementById('checkout')
let modalBg = document.querySelector(".modal-bg");
let modalBg2 = document.querySelector(".modal-bg2");
let modalClose = document.querySelector(".modal-close");

// Delivery date
let date = document.getElementById('deliveryDate')
let x = Math.floor((Math.random() * 10) + 4);
let targetDate = new Date()
targetDate.setDate(targetDate.getDate() + x)
date.textContent = targetDate.toDateString()

// pay button 
let pay = document.getElementById('modal-btn')
pay.addEventListener('click', ()=>{
    modalBg2.classList.add("bg-active");
    setTimeout(showPage, 2000)
})
function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("thank").style.display = "block";
    localStorage.clear()
}

// close button redirect to home page
let goTohome = document.getElementById('close')
goTohome.addEventListener('click', ()=>{
    window.location =  "/index.html" //"H&F.html"
})
// Modal box
checkout.addEventListener('click', ()=>{
    let userData = JSON.parse(localStorage.getItem('userStatus'))
    if(tempc == undefined){
        alert("You dont have any product to buy")
    }
    else if(userData == null){
        alert("Please login to do checkout")
        location.href = "http://127.0.0.1:5500/Login/login.html"

    } else {

        modalBg.classList.add("bg-active");
    }
})

modalClose.addEventListener("click", function () {
    modalBg.classList.remove("bg-active");
  });

  // getting data from loacal storage
  let wishlist_active = document.querySelector('.wishlist_active')
  let added = localStorage.getItem("cart-products")
  let addedW = localStorage.getItem("add-wishlist")
  let added_prod = JSON.parse(added)
  let addedW_prod = JSON.parse(addedW)  
function getPurchaseData(){
    if(added_prod !== null && addedW_prod == null){
        document.querySelector('.empty-cart').style.display = 'none'
        cart_active.style.display = "block"
        cart_active.textContent = added_prod.length
        showPurchaseData(added_prod)
    } else if(addedW_prod !== null && addedW_prod !== null){
        document.querySelector('.empty-cart').style.display = 'none'
        cart_active.style.display = "block"
        cart_active.textContent = added_prod.length
        wishlist_active.style.display = "block"
        wishlist_active.textContent = addedW_prod.length
        showPurchaseData(added_prod)
    }
    else if(added_prod == null && addedW_prod !== null){
        document.querySelector('.empty-cart').style.display = 'none'
        wishlist_active.style.display = "block"
        wishlist_active.textContent = addedW_prod.length
    } else {
        document.querySelector('.empty-cart').style.display = 'block'
    }
    addprice(added_prod)
}

// displaying data get from local storage, displaying in table form
function showPurchaseData(data){
    // console.log(data)
    display.innerHTML = ""
    let table = document.createElement('table')
    let thead = document.createElement('thead')
    let tr1 = document.createElement('tr')
    let th1 = document.createElement('th')
    let th2 = document.createElement('th')
    th2.textContent = 'PRODUCT'
    let th3 = document.createElement('th')
    th3.textContent = 'PRICE'
    let th4 = document.createElement('th')
    th4.textContent = 'QUANTITY'
    let th5 = document.createElement('th')
    th5.textContent= 'TOTAL'
    tr1.append(th1, th2, th3, th4, th5)
    let tr2 = document.createElement('tr')
    let td6 = document.createElement('td')
    td6.setAttribute('colspan', '6')
    let div = document.createElement('div')
    div.setAttribute('class', 'line2')
    td6.append(div)
    tr2.append(td6)
    thead.append(tr1, tr2)
    table.append(thead)
    
    let tbody = document.createElement('tbody')

        // adding clear cart button attached to table
    let clearCart = document.createElement('button')
    clearCart.textContent = 'CLEAR SHOPPING CART'
    clearCart.setAttribute('class', 'clear')
    clearCart.setAttribute('onclick', 'remove()')

    // added update cart button, which update cart total when clicked
    let updateCart = document.createElement('button')
    updateCart.textContent = 'UPDATE CART'
    updateCart.setAttribute('class', 'clear')
    updateCart.setAttribute('onclick', 'updateTotal()')

    let html = ""
    for(i in data){
        html += ` <tr>
        <td>
        <img src="${data[i].img}" alt="image">
        </td>
        <td>${data[i].title}</td>
        <td>Rs. ${data[i].price}</td>
        <td>
        <div class="quantity">
                <button class="minus" onclick="minus(${data[i].id})">-</button>
                <input type="text" data-id=input${data[i].id} class="quan" id="${data[i].id}" price="${data[i].price}" value=1 onchange="multiply(this)">
                <button class="plus" onclick="plus(${data[i].id})">+</button>
                </div>
        </td>
        <td >
        <div class="bold" ><span>Rs.  </span> <h3 data-id=total${data[i].id}>${data[i].price}</h3></div>
        </td>
        <td>
        <button class="delete" onclick=delet(${data[i].id})>X</button>
        </td>
    </tr>
    <tr>
        <td colspan="6"><div class="line2"></div></td>
    </tr>`
    }
    tbody.innerHTML = html
    table.append(tbody)
   display.append(table, clearCart, updateCart)
    
}
// Handling no of quantity
function minus(pid){
    let added = localStorage.getItem("cart-products")
    let data = JSON.parse(added)
    for(i in data){
        if (data[i].id === pid){
            let total = document.querySelector(`[data-id=total${data[i].id}]`)
            total.textContent = Number(total.textContent)  - Number(data[i].price)
            if(total.textContent < 1){
                total.textContent = 0
            }

            let input = document.querySelector(`[data-id=input${data[i].id}]`)
            let val = input.value
            input.value = Number(val) - 1
            if(val < 1){
                input.value = 0
            }
        }
    }
    updateTotal()
    cartTotal()
}

function plus(pid){
    let added = localStorage.getItem("cart-products")
    let data = JSON.parse(added)
    for(i in data){
        if (data[i].id === pid){
            let total = document.querySelector(`[data-id=total${data[i].id}]`)
            total.textContent = Number(total.textContent) + Number(data[i].price)

            let input = document.querySelector(`[data-id=input${data[i].id}]`)
            let val = input.value
            input.value = Number(val) + 1
        }
    }
    updateTotal()
    cartTotal()
}
let offer = document.querySelector('.offer')
let freeShip = document.querySelector('.free_ship')

// on changing quantit this should change price in total cart.
function cartTotal(){
    let added = localStorage.getItem("cart-products")
    let data = JSON.parse(added)
    let tot = 0
    for(i in data){
        let total = document.querySelector(`[data-id=total${data[i].id}]`).textContent
        tot += Number(total)        
    }
    bill_amt.textContent = tot.toFixed(2) 
    total_amt.textContent = (Number(tot) + (Number(tot) * 0.18)).toFixed(2)
    if(bill_amt.textContent > 1999){
        offer.style.display = "none"
        freeShip.style.display = "block"
    } else if (bill_amt.textContent < 1999){
        offer.style.display = "block"
        freeShip.style.display = "none"
    }
}

// on page reload this should show total price of available products
function addprice(data){
    let total = 0;
    let bill = 0;
    for(i in data){
        let total_prod_price = document.querySelector(`[data-id=total${data[i].id}]`).textContent
        bill += Number(total_prod_price) 
        total = Number(bill) + (Number(bill) * 0.18)
    }
    bill_amt.textContent =bill.toFixed(2)
    total_amt.textContent = total.toFixed(2)
    if(bill_amt.textContent > 1999){
        offer.style.display = "none"
        freeShip.style.display = "block"
    } else if (bill_amt.textContent < 1999){ 
        offer.style.display = "block"
        freeShip.style.display = "none"
    }
}  
let tempc = JSON.parse(localStorage.getItem('cart-products'))
localStorage.setItem('tempc', JSON.stringify(tempc))


// delete particular from table and local storage
function delet(did){
    let added = localStorage.getItem("tempc")
    let data = JSON.parse(added)
    let cart_remained = data.filter(el => {
        return (el.id !== did)
    })
    
    localStorage.setItem('tempc', JSON.stringify(cart_remained))
   
    let final = JSON.parse(localStorage.getItem('tempc'))

    if(JSON.stringify(final) !== JSON.stringify([])){
        cart_active.textContent = final.length
        showPurchaseData(final)
    } else {
        remove()
    }
    
}

// clear all data from local storage as well as page
function remove (){
    document.querySelector('.empty-cart').style.display = 'block'
    display.style.display = 'none'
    localStorage.removeItem('cart-products')
    localStorage.removeItem('tempc')
    cart_active.style.display = "none"
    addprice()
    
}

// update total price of cart if cart gets updated
function updateTotal(){
    let added = localStorage.getItem("tempc")
    let data = JSON.parse(added)
    addprice(data)
}
/* ---------------------------------------------Cart Code ends here----------------------------------------------- */

// change of payment mode
function SetSelectedValue() {
    let e = document.getElementById("cust");
    let pay_mode_show = document.getElementById('payment_mode_show')
    let name = e.options[e.selectedIndex].value;
    // console.log(name)
    pay_mode_show.textContent = "PAYMENT MODE: "+ name
    name = "";
}

let address = document.getElementById('address')
let phone = document.getElementById('phone')
let userData = JSON.parse(localStorage.getItem('userStatus'))
address.textContent = userData[0].address;
phone.textContent = userData[0].number


