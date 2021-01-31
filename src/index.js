async function getComponent() {
    const {default: _} = await import(/* webpackChunkName:"lodash" */'lodash')
    var element = document.createElement('div')
    element.innerHTML = _.join(['1', '2'], '***')
    return element
}
// 懒加载
// 通过click绑定getComponent方法，使得lodash的代码不会在首页加载，而是点击事件发生之后加载
document.addEventListener('click', () => {
    getComponent().then(element => {
        document.body.appendChild(element)
    })
})
