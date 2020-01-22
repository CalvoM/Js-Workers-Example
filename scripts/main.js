let fetchWorker;
let search_posts=[]
let messageObj={'title':'','message':''}
let form = document.querySelector('form')
let searchInput = document.querySelector('input#searchInput')
let postList = document.querySelector('ul#postList')
let textSpan = document.createElement('p')
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
    if(event.data.title==="search"){
        if(search_posts.length==0){
            postList.removeChild(textSpan)
        }
        console.log(event.data.message)
        search_posts.push(event.data.message)
        updateListUi(event.data.message)
    }
}
function updateListUi(data){
    let list_item = document.createElement('li')
    list_item.appendChild(document.createTextNode(data.title))
    list_item.classList.add('postItem')
    postList.appendChild(list_item)
}
    if(search_posts.length==0){
        textSpan.textContent = "No posts Available!"
        textSpan.classList.add('statusNote')
        postList.appendChild(textSpan)
    }
