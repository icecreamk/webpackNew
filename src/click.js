
import './style1.css'
function handleClick () {
    const ele = document.createElement('div')
    ele.innerHTML = '1'
    document.body.appendChild(ele)
}

export default handleClick