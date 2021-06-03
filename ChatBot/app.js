////////// ChatBot Code Starts here /////////

let welcomeFlag = false
let line1 = "Hello there! Need help? Reach out to us right here, and we'll get back to you as soon as we can!";
let line2 = "Yes I'm live!!";
let line3 = "I'm your ChatBot Gryffindor";
let line4 = "let me know if you need Any Help"
let welcomeLines = [line1, line2, line3, line4]
let chatIcon = document.getElementById("chatDiv")
let popup = document.getElementById("chatPopup")
let closeBtn = document.getElementById("closeBtn")
let chatInput = document.getElementById("chatInput")
let msgReply = document.getElementById("reply")
let chatBox = document.getElementById("chatBox")
let botAnswers = {
    "product": ["We have lipsticks with variety of different colours and shades ranging from ₹199 to ₹1299", 
            "Checkout our Liquid Lip Colors, i'm sure you will be Amazed", 
            "Checkout our value set which has discounted product combos", 
            "did you checked our recent blog post ? we have added list of some new product there.", 
            "There is new Gifting section, from there you can choose wide range of most suitable gifting sets.", 
            "Our Limited Edition Makeup kit is Back, place your order before it again get out of stock", 
            "We have introduce some mini sets for teenager like you, take a look at it in Mini set section",],
    "offer": ["Beginne's Must have kit 2.0, Bestselling Makeup Hits + Sheet Mask + Quirkly Doodle Pouch, Only at ₹999",
            "DEAL OF THE MONTH, Get A Beauty Bestseller, worth up to ₹149 on shopping of ₹499",
            "DEAL OF THE MONTH, Get A Treandy Croc Pouch Or A makeup Bestseller, worth up to ₹599 on shopping of ₹999",
            "DEAL OF THE MONTH, Get A Luxe Lipstick or  Fun Merchandise, worth up to ₹1198 on shopping of ₹1999",
            "DEAL OF THE MONTH, Get An Eyeshadow Palette + Lip Crayon, worth up to ₹1998 on shopping of ₹2499"],
    "face": ["Charcoal Patrol Face Mask at only ₹99",
            "Sugar Cheat Sheet Brightening Mask at only ₹149",
            "Charcoal Patrol Bubble Mask at only ₹149",
            "Aquaholic Water Boost Mask at only ₹149",
            "Cheat Sheet Anti-Aging Mask at only ₹99",
            "Power Clay Peel Off Mask at only ₹499",
            "Cheat Sheet Clarifying Mask at only ₹99",
            "Power Clay 3-Min Pore Cleansing Mask at only ₹499",
            "Sugar Cheat Sheet Pore Care Mask at only ₹149"]
}
let keyArr = Object.keys(botAnswers)
let audio = new Audio("https://tgdown.eu-gb.mybluemix.net/4292994105966528/ting.mp3")
let defaultAnswer = ["Need Help ? Ask something relavent like 'product', 'offer' or 'face'"]

showPopup = () => {
    chatIcon.setAttribute("class", "hideItem")
    popup.setAttribute("class", "chatPopup")
    showWelcomeMsg()
}

showWelcomeMsg = () => {
    if(welcomeFlag == false){
        let arrIndex = 0
        setInterval(()=>{
            if(arrIndex < welcomeLines.length){
                botReply = welcomeLines[arrIndex]
                printBotMsg(botReply)
                arrIndex++
            }
        },1500)
    }
    welcomeFlag = true;
}

closeEverything = () => {
    chatIcon.setAttribute("class", "chatDiv")
    popup.setAttribute("class", "hideItem")
}

displayMsg = (msg) => {
    msgReply.value = ""
    let userMsg = document.createElement("div")
    let msgText = document.createElement("p")
    userMsg.setAttribute("class", "userMsg")
    msgText.textContent = msg
    userMsg.append(msgText)
    chatBox.append(userMsg)
    scrollDown()
    chatBotReply(msg)
}

chatBotReply = (msg) => {
    for(let i = 0; i < keyArr.length; i++){
        if(msg == keyArr[i]){
            setTimeout(()=>{
                let botReply = botAnswers[msg][Math.floor(Math.random() * botAnswers[msg].length)]
                printBotMsg(botReply)
                },1500)
                break
        }

        if(keyArr[i+1] == undefined){
            setTimeout(()=>{
                let botReply = defaultAnswer
                printBotMsg(botReply)
            }, 2000)
        }
    }
}

printBotMsg = (para) => {
    let url = "https://sugar-cosmetics.webpush.freshchat.com/5fe107e92ec49ebae945f0cedffc02a1f71c8cfcc175080ae2db0c652019a90b/f_hlimage/u_be1d8877d49e57a14b5be6e9cfc109a6d91d88702e89141f6559bdf9c348b663/img_1524456641013.png"
    let botMsgDiv = document.createElement("div")
    let chatIconDiv = document.createElement("div")
    let botReplyDiv = document.createElement("div")
    let botDP = document.createElement("img")
    let botMsg = document.createElement("p")
    botDP.setAttribute("src", url)
    botMsg.textContent = para
    botMsgDiv.setAttribute("class", "botMsg")
    chatIconDiv.setAttribute("class", "chatIconDiv")
    botReplyDiv.setAttribute("class", "botReplyDiv")
    chatIconDiv.append(botDP)
    botReplyDiv.append(botMsg)
    botMsgDiv.append(chatIconDiv, botReplyDiv)
    chatBox.append(botMsgDiv)
    scrollDown()
    audio.play();
}
scrollDown = () => {
    chatBox.scrollTop = chatBox.scrollHeight;
}

closeBtn.addEventListener("click", closeEverything)
chatIcon.addEventListener("click", showPopup)

chatInput.addEventListener('submit', e => {
    e.preventDefault();
    let msg = e.currentTarget.myText.value
    displayMsg(msg)
});

////////// ChatBot Code Ends Here //////////