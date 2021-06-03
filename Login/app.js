let loginPage = document.getElementById("loginPage")
let registerPage = document.getElementById("registerPage")
let showLoginBtn = document.getElementById("showLoginBtn")
let showRegisterBtn = document.getElementById("showRegisterBtn")
let userEmail = document.getElementById("userEmail")
let userPassword = document.getElementById("userPassword")
let getName = document.getElementById("getName")
let getEmail = document.getElementById("getEmail")
let getPassword = document.getElementById("getPassword")
let getNumber = document.getElementById("getNumber")
let getAddress = document.getElementById("getAddress")

let loginBtn = document.getElementById("loginBtn")
let registerBtn = document.getElementById("registerBtn")

showRegisterPage = () => {
    loginPage.setAttribute("class", "hideItems")
    registerPage.setAttribute("class", "loginContainer")
}

showLoginPage = () => {
    registerPage.setAttribute("class",  "hideItems")
    loginPage.setAttribute("class", "loginContainer")
}


// let login = document.getElementsByClassName("loginContainer")
// let afterlogin = document.getElementsByClassName("afterlogin")
userLogin = () => {
    fetch("https://sugarcosmeticsdb.herokuapp.com/users")
    .then(res => res.json())
    .then((res) => {

        let login = document.getElementById("loginPage")
        let afterlogin = document.getElementById("aftlgn")

        let currUserEmail = userEmail.value;
        let currUserPassword = userPassword.value;
        let currUserName = getName .value;
        let currUserAddress = getAddress.value;
        let currUserPhone = getNumber.value;

        let user = false

        for(let i = 0; i < res.length; i++){
            let email = res[i].email;
            let password = res[i].password;

            if((currUserEmail == email) && (currUserPassword == password)){
                user =true
                let userStatus = []
                let tempObj = {}

                tempObj.name = res[i].name
                tempObj.email = res[i].email
                tempObj.number = res[i].number
                tempObj.address = res[i].address

                userStatus = [tempObj]
                localStorage.setItem("userStatus", JSON.stringify(userStatus))



                let accuser = localStorage.getItem("userStatus")
                console.log(JSON.parse(accuser))
                accuser = JSON.parse(accuser)
                let name = accuser[0].name
                let emails = accuser[0].email
                let address = accuser[0].address
                let number = accuser[0].number
                console.log(name)

                login.style.display="none";
                
                // alert("loggedin")
                let html=""
                html+=`<div class="left">
                <div class="profile1" ><p class="profile">Profile</p></div>
                <div class="profile1"><p class="profile">Orders</p></div>
                <div class="profile1"><p class="profile">Address</p></div>
                <div class="profile1"><p class="profile">Wishlist</p></div>
                <div class="profile1"><p class="profile">Log out</p></div>
            </div>

            <div class="right">
                <div class="top">
                    
                        <p  class="p">Hello ${name} (not ${name}? Sign out)</p>

                    
                </div>

                <div class="acc">
                    
                        <p  class="p1">Account details :</p>

                    
                </div>

                <div class="names">
                    
                        <p  class="p2">Name:	${name}</p>

                    
                </div>

                <div class="mail">
                    
                        <p  class="p3">E-mail:	${email}</p>

                    
                </div>
                <div class="mail">
                    
                        <p  class="p3">Address:	${address}</p>

                    
                </div>
                <div class="mail">
                    
                        <p  class="p3">Phone No.:	${number}</p>

                    
                </div>`
                document.getElementById("aftlgn").innerHTML+=html
                afterlogin.style.display="flex"

            }

        }
        if(user == false){
            alert("This user does not exist...Register First")
        }

        document.getElementsByClassName("loginContainer")
    })
}

showRegisterBtn.addEventListener("click", showRegisterPage)
showLoginBtn.addEventListener("click", showLoginPage)
loginBtn.addEventListener("click", userLogin)


//-------------------------------------------Registration starts here---------------------------------------------------//

document.getElementById("registerBtn").addEventListener("click", getResData)

async function getResData(){
    let name = document.getElementById("getName").value
    let email = document.getElementById("getEmail").value
    let number = document.getElementById("getNumber").value
    let address = document.getElementById("getAddress").value
    let password = document.getElementById("getPassword").value
    let data={
        name,
        email,
        number,
        address,
        password
    }

    await fetch(`https://sugarcosmeticsdb.herokuapp.com/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },  
        body: JSON.stringify(data),
    }).then(response => response.json()).then(data => redirectToAccount(data)).catch((error) => {console.error('Error:', error);});

    // console.log(data)

    function redirectToAccount(data){
        window.location.href="/Login/login.html"
    }

}

//-------------------------------------------Registration ends here---------------------------------------------------//

//-------------------------------------------Load with Params starts here-----------------------------------------------//

window.addEventListener("DOMContentLoaded", getData)

function getData(){
    let query = window.location.search
    if(query != ""){
        queryLoad(query)
    }
}

function queryLoad(query){
    let data = new URLSearchParams(query)
    let name1 = data.get("name")
    let email1 = data.get("email")
    let number1 = data.get("number")
    let address1 = data.get("address")
    let login = document.getElementById("loginPage")
    let afterlogin = document.getElementById("aftlgn")
    user =true
                let userStatus = []
                let tempObj = {}

                tempObj.name = name1
                tempObj.email = email1
                tempObj.number = number1
                tempObj.address = address1

                userStatus = [tempObj]
                localStorage.setItem("userStatus", JSON.stringify(userStatus))



                let accuser = localStorage.getItem("userStatus")
                console.log(JSON.parse(accuser))
                accuser = JSON.parse(accuser)
                let name = accuser[0].name
                let email = accuser[0].email
                let address = accuser[0].address
                let number = accuser[0].number
                console.log(name)

                login.style.display="none";
                
                // alert("loggedin")
                let html=""
                html+=`<div class="left">
                <div class="profile1" ><p class="profile">Profile</p></div>
                <div class="profile1"><p class="profile">Orders</p></div>
                <div class="profile1"><p class="profile">Address</p></div>
                <div class="profile1"><p class="profile">Wishlist</p></div>
                <div class="profile1"><p class="profile">Log out</p></div>
            </div>

            <div class="right">
                <div class="top">
                    
                        <p  class="p">Hello ${name} (not ${name}? Sign out)</p>

                    
                </div>

                <div class="acc">
                    
                        <p  class="p1">Account details :</p>

                    
                </div>

                <div class="names">
                    
                        <p  class="p2">Name:	${name}</p>

                    
                </div>

                <div class="mail">
                    
                        <p  class="p3">E-mail:	${email}</p>

                    
                </div>
                <div class="mail">
                    
                        <p  class="p3">Address:	${address}</p>

                    
                </div>
                <div class="mail">
                    
                        <p  class="p3">Phone No.:	${number}</p>

                    
                </div>`
                document.getElementById("aftlgn").innerHTML+=html
                afterlogin.style.display="flex"
}


//-------------------------------------------Load with Params ends here-------------------------------------------------//