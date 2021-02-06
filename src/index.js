console.log('hello world')

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then((registertion) => {
            console.log(registertion)
        }).catch((err) => {
            console.log(err)
        } )
    })
}