document.addEventListener('click', () => {
    // 异步调用，在click时，才会加载func函数的内容
    import ('./click').then(({default: func}) => {
        func()
    })
})
