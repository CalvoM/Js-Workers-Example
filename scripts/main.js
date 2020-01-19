let fetchWorker;
let messageObj={'title':'','message':''}
let form = document.querySelector('form')
let searchInput = document.querySelector('input#searchInput')
if (window.Worker){
    fetchWorker = new Worker('./scripts/fetchWorker.js')
}
form.addEventListener('submit',event=>{
    event.preventDefault();
    messageObj.title="search"
    messageObj.message=searchInput.value;
    fetchWorker.postMessage(messageObj)
    searchInput.value = ""
})
fetchWorker.onmessage= function(event){
    console.log(event.data)
}