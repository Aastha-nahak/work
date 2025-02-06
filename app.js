const AnneSelectorBtn= document.querySelector('#Anne-selector')
const JainSelectorBtn= document.querySelector('#Jain-selector')
const chatheader= document.querySelector('.chat-header')
const chatMessages= document.querySelector('.chat-messages')
const chathInputForm= document.querySelector('.chat-input-form')
const chatInput= document.querySelector('.chat-input')
const chatInputBtn= document.querySelector('.chat-input-button')
const clearchatbtn=document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const creatChatMessageElement=(message) =>`
 <div class="message ${message.sender === 'Anne'? 'blue-bg' : 'gray-bg'}>
                <div class="message-sender">${message.sender}</div>
                <div class="message-text">${message.text}</div>
                <div class="message-timestamp">${message.timestamp}</div>
 </div>      
 `

 window.onload = () => {
    messages.forEach(message) =>{
        chatMessages.innerHTML += creatChatMessageElement(message)
    }   
 
 }
 let messageSender = 'Anne'

 const updateMessageSender= (name) => {
    messageSender = name
    chatheader.innerText = `${messageSender} chatting...`
    chatInput.placeholder=`Type here,${messageSender}...`

    if(name==='Anne'){
        AnneSelectorBtn.classList.add('active-person')
        JainSelectorBtn.classList.add('active-person')
    }
    if(name==='Jain'){
        JainSelectorBtn.classList.add('active-person')
        AnneSelectorBtn.classList.add('active-person')
    }

    chatInput.focus()
 }
 AnneSelectorBtn.onclick=()=> updateMessageSender('Anne')
 JainSelectorBtn.onclick=()=> updateMessageSender('Jain')

 const sendMessage = (e) => {
    e.preventDefault()
    
    const timestamp = new date().toLocaleString('en-US',{hour: 'numeric',minute:'numeric',hour12: true})
    const message = {
        sender: messageSender,
        text: chatInput.Value,
        timestamp,
    }

    messageSender.push(message)
    localStorage.setItem('messages',JSON.stringify(message))
    chatMessages.innerHTML += creatChatMessageElement(message)

    chathInputForm.reset()
    chatMessages.scrollTop = chatMessages.scrollHeight
}
chathInputForm.addEventListener('submit',sendMessage)

clearchatbtn.addEventListener('click',()=>{
    localStorage.clear()
    chatMessages.innerHTML = ''
})
