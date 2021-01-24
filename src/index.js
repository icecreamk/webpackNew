import './style.css'
import imgSrc from './images/icon.jpg'
const a  = () => {
    const root = document.getElementById("root")
    const img = new Image ()
    img.src = imgSrc
    root.append(img)

}

a()