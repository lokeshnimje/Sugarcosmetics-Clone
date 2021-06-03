window.addEventListener('load', cartWishNum)

let cart_active = document.querySelector('.cart_active')
let wishlist_active = document.querySelector('.wishlist_active')

function cartWishNum(){
    let added = localStorage.getItem("cart-products")
    let addedW = localStorage.getItem("add-wishlist")
    let addedW_prod = JSON.parse(addedW)
    let added_prod = JSON.parse(added)
    console.log(added_prod)
    if(added_prod !== null){
        cart_active.style.display = "block"
        cart_active.textContent = added_prod.length
        wishlist_active.style.display = "block"
        wishlist_active.textContent = addedW_prod.length
    }
}

window.addEventListener("DOMContentLoaded", getData)

function getData(){
    let query = window.location.search
    if(query != ""){
        queryLoad(query)
    }
}

function queryLoad(query){
    let data = new URLSearchParams(query)
    let id = data.get("id")
    let title = data.get("title")
    let mrp = data.get("mrp")
    let price = data.get("price")
    let img = data.get("img")
    let html = ""
    // console.log(title)

    html += `
        <div class="container">
            <div class="left">
                <img class="prod_img" src="${img}" alt="${title}">
            </div>
            <div class="right">
                <h2>${title}T</h2>       
                <div class="priceData">
                    <p>Rs. ${mrp}</p>
                    <p>Rs. ${price}</p>
                </div>
                <button class="add_to_cart">ADD TO CART</button>
                <p id="wishListLS"><i class="far fa-heart">Add to Wishlist</i></p>
                <div class="offer">GET AN EXCITING GIFT COMPLIMENTARY WORTH UP TO RS 599 ON A SPEND OF RS 999 OR ABOVE</div>
                <div class="symbols">
                    <img class="img" src="https://cdn.shopify.com/s/files/1/0906/2558/files/SUGAR_Trust_Seal_473x.progressive.jpg?v=1597728764" alt="">
                </div>
                <div class="line"></div>
                <div class="share">
                    <p>Share:</p>
                    <a href=""><i class="fa fa-facebook"></i></a>
                    <a href=""><i class="fa fa-twitter"></i></a>
                    <a href=""><i class="fa fa-envelope"></i></a>
                    <a href=""><i class="fa fa-pinterest"></i></a>
                    <a href=""><i class="fa fa-tumblr"></i></a>
                </div>
            </div>
        </div>
    `
    document.getElementById("displayData").innerHTML = html

}