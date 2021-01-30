import _ from 'lodash'
var element = document.createElement('div')
element.innerHTML = _.join(['1', '2'], '***')
document.body.appendChild(element)