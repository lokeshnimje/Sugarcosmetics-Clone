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
                <button class="add_to_cart" data-id="${id}" onclick="settols(this)">ADD TO CART</button>
                <p id="wishListLS"><i class="far fa-heart" data-id="${id}" "onclick="addToWishList(this)">Add to Wishlist</i></p>
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

function addToWishList(pID){
    let id = pID.id
    fetch(`https://sugarcosmeticsdb1.herokuapp.com/combined?id=${id}`).then(res => res.json()).then(data => addToWishListLS(data)).catch((Error) => console.log(Error))

    function addToWishListLS(val){
        let id = val[0].id
        let title = val[0].title
        let img = val[0].img
        let price = val[0].price
        let mrp = val[0].mrp
        let html = ""
        // console.log(mrp)

        let temp = {}
        temp.id=id
        temp.title=title
        temp.price=price
        temp.img = img
        temp.mrp = mrp

        console.log(temp)
    
        arr = [...arr,temp]
        localStorage.setItem("add-wishlist",JSON.stringify(arr))
        let modalW = document.getElementById("myModalW");
        let spanW = document.getElementsByClassName("closeW")[0];
        modalW.style.display = "block"; 
        html += `<div class="wishListPopUp"><p>Item added to Wishlist</p><i class="fas fa-heart"></i></div>`
        document.getElementById("wishListPopUpData").innerHTML = html
        spanW.onclick = function() {
            modalW.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modalW) {
                modalW.style.display = "none";
            }
        }
    }
}

let arr = []
function settols(e){
    // console.log("object")
    let id = e.getAttribute("data-id")
    fetch(`https://sugarcosmeticsdb1.herokuapp.com/combined?id=${id}`).then(res => res.json()).then(data => AddToLSFromHp(data)).catch((Error) => console.log(Error))
}

function AddToLSFromHp(data){   
    let title = data[0].title
    let price = data[0].price
    let img = data[0].img
    let id = data[0].id
    let html = ""

    var temp = {}
    temp.id=id
    temp.title=title
    temp.price=price
    temp.img = img

    console.log(temp)
    
    arr = [...arr,temp]
    localStorage.setItem("cart-products",JSON.stringify(arr))
    
    let modalW = document.getElementById("myModalW");
    let spanW = document.getElementsByClassName("closeW")[0];
    modalW.style.display = "block"; 
    html += `<div class="cartPopUp"><p>Item added to Cart</p><i class="fas fa-shopping-cart"></i></div>`
    document.getElementById("wishListPopUpData").innerHTML = html
    spanW.onclick = function() {
        modalW.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modalW) {
            modalW.style.display = "none";
        }
    }
}