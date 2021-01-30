// import '@babel/polyfill'
import './style.css'
import './iconfont/iconfont.css'
import counter from './counter'
import imgSrc from './images/icon.jpg'
import number from './number'
const a  = () => {
    const root = document.getElementById("root")
    const img = new Image ()
    img.src = imgSrc
    root.append(img)

}
a()

const ccc = 1

var btn = document.createElement('div')
btn.innerHTML = 'add'
document.body.appendChild(btn)
btn.onclick = function () {
    var div = document.createElement('div')
    div.innerHTML = 'item'
    document.body.appendChild(div)
}

counter()
number()

if (module.hot) {
    // 当number模块更新时，执行number方法
    module.hot.accept('./number', () => {
        document.body.removeChild(document.getElementById('number'))
        number()
    })
}