
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
var messageTwo = document.querySelector('#message-2');

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                console.log(data.error);
                messageTwo.textContent = data.error
            }else{
                console.log(data.forecast);
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    }).catch((err)=>{
        messageTwo.textContent = 'No internet connection'
    })
    console.log(location)
})