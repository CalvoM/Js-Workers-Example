const cors_url = 'https://corscorrect.herokuapp.com/'
let messageObj = { 'title': '', 'message': '' }
self.onmessage = function(event){
    let {title,message} = event.data;
    if(title==='search'){
        let responseObj= {"userLink":message.toString()}
        fetch(cors_url+'https://thibitisha-fake-news-api.herokuapp.com/scrape/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(responseObj)
        })
        .then(response=>{
            if(response.status!==200 || !response || response.ok!=true){
                return Error('Error while fetching!')
            }
            return response.json()
        })
        .then(data =>{
            messageObj.title="search";
            messageObj.message=data
            postMessage(messageObj)
        })
        .catch(err =>{
            console.log(err)
        })
    }
}
