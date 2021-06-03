// ------------------------------------------------wishlist code starts Here------------------------------------------------
window.addEventListener('load', execute)
let wishlist_active = document.querySelector('.wishlist_active') //wishlist icon
let cart_active = document.querySelector('.cart_active')        // cart icon

function execute(e){
    e.preventDefault()
    getPurchaseData()
}

// get data from local storage
let addedC = localStorage.getItem("cart-products")  // getting data from ls
let added = localStorage.getItem("add-wishlist")    
let added_prod = JSON.parse(added)
let added_prodC = JSON.parse(addedC)
function getPurchaseData(){
    // console.log(added_prod)
    if(added_prod !== null && added_prodC == null){     //if products are present the  show products
        document.querySelector('.empty-cart').style.display = 'none'
        wishlist_active.style.display = "block"
        wishlist_active.textContent = (added_prod.length)
        showWishlistData(added_prod)
    }else if(added_prod !== null && added_prodC !== null){
        document.querySelector('.empty-cart').style.display = 'none'
        wishlist_active.style.display = "block"
        wishlist_active.textContent = (added_prod.length)
        cart_active.style.display = "block"
        cart_active.textContent = added_prodC.length
        showWishlistData(added_prod)
    }
    else if(added_prod == null && added_prodC !== null){
        cart_active.style.display = "block"
        cart_active.textContent = added_prodC.length
    } else {
        document.querySelector('.empty-cart').style.display = 'block'   // prod is not present then show empty
    }
}
// show added products on page
let display = document.querySelector('.data')
function showWishlistData(data){
    // console.log(data)
    display.innerHTML = ""

    let clearCart = document.createElement('button')
    clearCart.textContent = 'CLEAR WISHLIST'
    clearCart.setAttribute('class', 'clear')
    clearCart.setAttribute('onclick', 'remove()')

    let html = ""
    for(i in data){
        html += `<div class="card">
        <div class="product">
            <img src="${data[i].img}" alt="product image">
            <h3 style="margin-left: 20px;">${data[i].title} </h3>
        </div>
        <div class="price">
             <span style="text-decoration: line-through; color: grey;">Rs. ${data[i].mrp}</span>
            <span style="font-weight: bold;">Rs. ${data[i].price}</span>
        </div>
        <div>
            <button class="add_cart" id=${data[i].id} onclick="add(this)">ADD TO CART</button>
        </div>
        <button class="delete" onclick=delet(${data[i].id})>X</button>
        </div>`
    }
  display.innerHTML= html
  display.append(clearCart)
}

// Add products to cart 
let cart_products = JSON.parse(localStorage.getItem('cart-products')) || []

function add(event) {
    event.textContent = "ADDED "
    event.style.backgroundColor ="green"

    let added = localStorage.getItem("add-wishlist")
    let data = JSON.parse(added)
    for(i in data){
        if(data[i].id == event.id){
            // console.log(data[i])
            cart_products = [...cart_products, data[i]]
        }
    }
    
    localStorage.setItem("cart-products", JSON.stringify(cart_products))
}

let temp = JSON.parse(localStorage.getItem('add-wishlist'))
localStorage.setItem('temp_wish', JSON.stringify(temp))

// delete particular item from list
function delet(did){
    let added = localStorage.getItem("temp_wish")
    let data = JSON.parse(added)
    let cart_remained = data.filter(el => {
        return (el.id !== did)
    })
    
    localStorage.setItem('temp_wish', JSON.stringify(cart_remained))
   
    let final = JSON.parse(localStorage.getItem('temp_wish'))

    if(JSON.stringify(final) !== JSON.stringify([])){
        wishlist_active.textContent = (final.length)
        showWishlistData(final)
    } else {
        remove()
    }
    
}
// clear added products from page as well as local storage
function remove (){
    document.querySelector('.empty-cart').style.display = 'block'
    display.style.display = 'none'
    localStorage.removeItem('add-wishlist')
    localStorage.removeItem('temp_wish')
    wishlist_active.style.display = "none"
}


// ------------------------------------------------wishlist code ends Here------------------------------------------------