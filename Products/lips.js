let list = document.getElementById("list").addEventListener("click",getItemlist)
        let grid = document.getElementById("grid").addEventListener("click",getItemgrid)
        // let az = document.getElementById("grid").addEventListener("click",getItemg)
        // let za = document.getElementById("grid").addEventListener("click",getItemg)
        // let lh = document.getElementById("grid").addEventListener("click",getItemg)
        // let hl = document.getElementById("grid").addEventListener("click",getItemg) -->
        
        window.addEventListener("load",execute)

        function execute(e){
            e.preventDefault();
            getItem()
        }

        let main1 = document.getElementById("main")
        let main2 = document.getElementById("main2")
        function getItem(){
            let url = `https://sugarcosmeticsdb.herokuapp.com/lips`

            let xhr = new XMLHttpRequest()
            xhr.open('GET', url)
            xhr.onload = () => {
                if(xhr.status === 200){
                    let res = JSON.parse(xhr.response)
                    console.log(res)
                    
                    let html =""
                    let html1 =""

                    for(i in res){
                        html+=`<div class="cards" data-id="card${res[i].id}"  data-title="${res[i].title}" onmouseOver="showItems(${res[i].id})" onmouseout="removeItems(this)">
                                
                                    <img src=${res[i].img}/>
                                    <div class="inr" data-id=${res[i].id} onclick="viewProductModal(this)"><i class="fa fa-search" style="font-size:20px"></i></div>
                                    <div class="inr1" data-id=${res[i].id} onclick="addToWishList(this)"><i class="fa fa-heart"   style="font-size:20px"></i></div>
                                    <button data-id=${res[i].id} data-title=${res[i].title} data-price=${res[i].price} data-img=${res[i].img} onclick="settols(this)" class="cart1">Add to Cart</button>
                                <div class="title">
                                    <h3 style="margin:0px;">${res[i].title}</h3>
                                    <h4 style="margin:0px;">₹${res[i].price}</h4>
                                </div>
                            </div>`
                            html1+=`
                            <div class="cards1">
                                
                                <img src=${res[i].img}/>
                            <div class="title1">
                                <h3 style="margin:0px;">${res[i].title}</h3>
                            </div>
                            <div class="price">
                                
                                    <h4><s>₹${res[i].mrp}</s> - ₹${res[i].price}</h4>
                                    <button data-id="${res[i].id}" data-title="${res[i].title}" data-price="${res[i].price}" data-img="${res[i].img}"id="cart" class="cart" onClick="settols(this)">Add to Cart</button>
                                
                                
                            </div>
                        </div>`
                           main1.innerHTML = html
                            main2.innerHTML = html1
                    }
                }
            }
            xhr.send()
        }
        

        function getItemlist(){
            main2.style.display="block"
            main2.style.direction="row"
            main1.style.display="none"
            console.log(1)

        }

        function getItemgrid(){
            main2.style.display="none"
            main1.style.display="flex"
            // console.log(e)
        }

        function showItems(e){
        let sort=document.getElementById("select").value

            // let id = e.getAttribute("data-id")
            let elem = document.getElementsByClassName("inr");
            // // // for(let i = 0; i <elem.length; i+=1){
                elem[e-1].style.display = "block";
            // //     elem[i].style.transition="all 2s";
            // //     // console.log("")
            // // // }

            let elems = document.getElementsByClassName("inr1");
            // for(let j = 0; j <elems.length; j+=1){
                elems[e-1].style.display = "block";
            //     elems[j].style.transition="all  2s ease-out";
            // }
            let elems1 = document.getElementsByClassName("cart1");
            // for(let k = 0; k <elems1.length; k+=1){
                elems1[e-1].style.display = "block"
            //     elems1[k].style.transition="visibility 0s, opacity 0.5s;";
            // }
            
            console.log(e)
            // if(sort === "Price, low to high"){
            //     console.log(1)
            //     // let elem = document.getElementsByClassName("inr");
            // // // // for(let i = 0; i <elem.length; i+=1){
            //     elem[e].style.display = "block";
            // // //     elem[i].style.transition="all 2s";
            // // //     // console.log("")
            // // // // }

            // // let elems = document.getElementsByClassName("inr1");
            // // for(let j = 0; j <elems.length; j+=1){
            //     elems[e].style.display = "block";
            // //     elems[j].style.transition="all  2s ease-out";
            // // }
            // // let elems1 = document.getElementsByClassName("cart1");
            // // for(let k = 0; k <elems1.length; k+=1){
            //     elems1[e].style.display = "block"
            // //     elems1[k].style.transition="visibility 0s, opacity 0.5s;";
            // // }
            // }
        }
        

function removeItems(e){
    let id = e.getAttribute("data-id")
    let eleme = document.getElementsByClassName("inr");
    for(let i = 0; i <eleme.length; i+=1){
        eleme[i].style.display = "none"
    }

    let elemes = document.getElementsByClassName("inr1");
    for(let j = 0; j <elemes.length; j+=1){
        elemes[j].style.display = "none"
    }
    let elems1 = document.getElementsByClassName("cart1");
        for(let k = 0; k <elems1.length; k+=1){
            elems1[k].style.display = "none"
        }
}

    let arr = JSON.parse(localStorage.getItem("cart-products")) || []
    function settols(e){
        let ide = e.getAttribute("data-id")
        let id = +ide
        let title = e.getAttribute("data-title")
        let priceS = e.getAttribute("data-price")
        let price = +priceS
        let img = e.getAttribute("data-img")
        let html = ""
        // console.log(img)
        // console.log(title)
        // console.log(price)
        console.log(typeof(price))
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
        html += `<div class="wishListPopUp"><i class="far fa-check-circle"></i><p>Item added to Cart</p></div>`
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
    

    
    document.getElementById("filter").addEventListener("click",sort)

    function sort(){
        console.log(2)
        // let id= e.getAttribute("data-id")
        // console.log(id)
        let sort=document.getElementById("select").value
        if( sort === "Price, low to high"){
            let url = `https://sugarcosmeticsdb.herokuapp.com/lips?_sort=price&_order=asc`

            let xhr = new XMLHttpRequest()
            xhr.open('GET', url)
            xhr.onload = () => {
                if(xhr.status === 200){
                    let res = JSON.parse(xhr.response)
                    console.log(res)
                    let html =""
                    let html1 =""
                    for(i in res){
                        html+=`<div class="cards" data-id="card${res[i].id}"  data-title="${res[i].title}" onmouseOver="showItems(${res[i].id})" onmouseout="removeItems(this)">
                                
                                    <img src=${res[i].img}/>
                                    <div class=inr data-id=${res[i].id} onclick="viewProductModal(this)"><i class="fa fa-search" style="font-size:20px"></i></div>
                                    <div class="inr1" data-id=${res[i].id} onclick="addToWishList(this)"><i class="fa fa-heart"   style="font-size:20px"></i></div>
                                    <button data-id="${res[i].id} onclick="settols1(this)" class="cart1">Add to Cart</button>
                                <div class="title">
                                    <h3 style="margin:0px;">${res[i].title}</h3>
                                    <h4 style="margin:0px;">₹${res[i].price}</h4>
                                </div>
                            </div>`
                            html1+=`
                            <div class="cards1">
                                
                                <img src=${res[i].img}/>
                            <div class="title1">
                                <h3 style="margin:0px;">${res[i].title}</h3>
                            </div>
                            <div class="price">
                                
                                    <h4><s>₹${res[i].mrp}</s> - ₹${res[i].price}</h4>
                                    <button data-id="${res[i].id}" data-title="${res[i].title}" data-price="${res[i].price}" data-img="${res[i].img}"id="cart" class="cart" onClick="settols(this)">Add to Cart</button>
                                
                                
                            </div>
                        </div>`
                           main1.innerHTML = html
                            main2.innerHTML = html1
                    }
                }
            }
            xhr.send()
        }
        else if (sort === "Price, high to low"){
            let url = `https://sugarcosmeticsdb.herokuapp.com/lips?_sort=price&_order=desc`

            let xhr = new XMLHttpRequest()
            xhr.open('GET', url)
            xhr.onload = () => {
                if(xhr.status === 200){
                    let res = JSON.parse(xhr.response)
                    console.log(res)
                    let html =""
                    let html1 =""
                    for(i in res){
                        html+=`<div class="cards" data-id="card${res[i].id}"  data-title="${res[i].title}" onmouseOver="showItems(${res[i].id})" onmouseout="removeItems(this)">
                                
                                    <img src=${res[i].img}/>
                                    <div class=inr data-id=${res[i].id} data-title=${res[i].title} onclick="viewProductModal(this)"><i class="fa fa-search" style="font-size:20px"></i></div>
                                    <div class="inr1" data-id=${res[i].id} onclick="addToWishList(this)"><i class="fa fa-heart"   style="font-size:20px"></i></div>
                                    <button data-id="${res[i].id} onclick="settols1(this)" class="cart1">Add to Cart</button>
                                <div class="title">
                                    <h3 style="margin:0px;">${res[i].title}</h3>
                                    <h4 style="margin:0px;">₹${res[i].price}</h4>
                                </div>
                            </div>`
                            html1+=`
                            <div class="cards1">
                                
                                <img src=${res[i].img}/>
                            <div class="title1">
                                <h3 style="margin:0px;">${res[i].title}</h3>
                            </div>
                            <div class="price">
                                
                                    <h4><s>₹${res[i].mrp}</s> - ₹${res[i].price}</h4>
                                    <button data-id="${res[i].id}" data-title="${res[i].title}" data-price="${res[i].price}" data-img="${res[i].img}"id="cart" class="cart" onClick="settols(this)">Add to Cart</button>
                                
                                
                            </div>
                        </div>`
                           main1.innerHTML = html
                            main2.innerHTML = html1
                    }
                }
            }
            xhr.send()
        }
    }

    //---------------------------------------Add to wishList starts here-------------------------------------------//
    let arr1 = JSON.parse(localStorage.getItem("add-wishlist")) || []

function addToWishList(e){
    let id = e.getAttribute("data-id")
    fetch(`https://sugarcosmeticsdb.herokuapp.com/combined?id=${id}`).then(res => res.json()).then(data => addToWishListLS(data)).catch((Error) => console.log(Error))
    console.log(id)

    function addToWishListLS(val){
        let id = val[0].id
        let title = val[0].title
        let img = val[0].img
        let price = val[0].price
        let mrp = val[0].mrp
        let html =""
        console.log(mrp)

        let temp = {}
        temp.id=id
        temp.title=title
        temp.price=price
        temp.mrp=mrp
        temp.img = img

        console.log(temp)
    
        arr1 = [...arr1,temp]
        localStorage.setItem("add-wishlist",JSON.stringify(arr1))
        // alert("Done")
        let modalW = document.getElementById("myModalW");
        let spanW = document.getElementsByClassName("closeW")[0];
        modalW.style.display = "block"; 
        html += `<div class="wishListPopUp"><i class="far fa-check-circle"></i><p>Item added to Wishlist</p></div>`
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
//---------------------------------------Add to wishList ends here-------------------------------------------//
    

//---------------------------------------Product view modal starts here-------------------------------------------//
function viewProductModal(e){
    let id = e.getAttribute("data-id")
    console.log(id)
    fetch(`https://sugarcosmeticsdb.herokuapp.com/combined?id=${id}`).then(res => res.json()).then(data => diaplayModalData(data)).catch((Error) => console.log(Error))
}

function diaplayModalData(val){

    console.log(val)
    let html = ""
    let title = val[0].title
    let img = val[0].img
    let mrp = val[0].mrp
    let price = val[0].price
    var countItmsub = 1
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    html+= `
        <div class="modalMainContainer">
            <div>
                <img class="img" src="${img}" alt="${title}">
            </div>
            <div>
            <div class="modalTitle"><label>${title}</label></div>
                <div class="modalPrice">
                    <div class="mrpPrice">Rs. ${mrp}</div>
                    <div class="salePrice">Rs. ${price}</div>
                </div>
                <div class="modalAddBtn">
                    <button class="addCartBtnModal" data-id="${val[0].id}" data-title="${val[0].title}" onclick="settols(this)">ADD TO CART</button>
                </div>
                <div class="modalAddwishlist">
                    <i class="far fa-heart" data-id="${val[0].id}" onClick="addToWishList(this)">Add to Wishlist</i>
                </div>
                    
                <div class="modalBanner">
                    <img class="img" src="//cdn.shopify.com/s/files/1/0906/2558/files/SUGAR_Trust_Seal_473x.progressive.jpg?v=1597728764" alt="">
                </div>
            </div>
        </div>
    `

    document.getElementById("modalData").innerHTML = html

    span.onclick = function() {
    modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// window.addEventListener('load', cartWishNum)

// let cart_active = document.querySelector('.cart_active')
// let wishlist_active = document.querySelector('.wishlist_active')

// function cartWishNum(){
//     let added = localStorage.getItem("cart-products")
//     let addedW = localStorage.getItem("add-wishlist")
//     let addedW_prod = JSON.parse(addedW)
//     let added_prod = JSON.parse(added)
//     console.log(added_prod)
//     if(added_prod !== null){
//         cart_active.style.display = "block"
//         cart_active.textContent = added_prod.length
//         wishlist_active.style.display = "block"
//         wishlist_active.textContent = addedW_prod.length
//     }
// }

//---------------------------------------WishList/Cart count starts here-------------------------------------------//
setInterval(function(){
    let cart_active = document.querySelector('.cart_active')
    let wishlist_active = document.querySelector('.wishlist_active')
    let added = localStorage.getItem("cart-products")
    let addedW = localStorage.getItem("add-wishlist")
    let addedW_prod = JSON.parse(addedW)
    let added_prod = JSON.parse(added)
    // console.log(added_prod)
    if(added_prod !== null && addedW_prod !== null){
        cart_active.style.display = "block"
        cart_active.textContent = added_prod.length
        wishlist_active.style.display = "block"
        wishlist_active.textContent = addedW_prod.length
    }
    else if(added_prod !== null && addedW_prod == null){
        cart_active.style.display = "block"
        cart_active.textContent = added_prod.length
    }
    else if(added_prod == null && addedW_prod !== null){
        wishlist_active.style.display = "block"
        wishlist_active.textContent = addedW_prod.length
    }
},1000)
//---------------------------------------WishList/Cart count ends here-------------------------------------------//
