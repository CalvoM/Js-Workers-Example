
const CACHE_NAME='cache-version-1'
let filesToCache=[
    '/',
    '/styles/main.css',
    '/scripts/main.js'
]
//@brief When SW is installed
self.addEventListener('install',event=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache=>{
            return cache.addAll(filesToCache)
        })
    )
    self.skipWaiting()
});
//@brief When SW is activated
self.addEventListener('activate',event=>{
   clients.claim()
});
//@brief When SW gets FETCH event
self.addEventListener("fetch",event=>{
    console.log(event)
    event.respondWith(
        caches.match(event.request)
        .then(response=>{
            if(response){
                return response
            }
            return fetch(event.request)
                    .then(response=>{
                        if(!response || response.status!==200){
                            return response
                        }
                        let clonedResponse = response.clone()
                        caches.open(CACHE_NAME)
                        .then(cache=>{
                            if(event.request.method==="GET")cache.put(event.request,clonedResponse)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        return response
                    })
                    
        })
    )
});