import tpl from './index.html'

function alert(message,resolve){
		var div = document.createElement('div')
		div.innerHTML = tpl({message:message})
		document.body.appendChild(div)
		var selector = document.querySelector('.template-alert')
		selector.querySelector('.ok').onclick=function(){
			document.body.removeChild(div)
			resolve(1111)
		}
		selector.querySelector('.cancel').onclick=function(){
			document.body.removeChild(div)
		}
}

export default function(message){
	return new Promise(function(resolve){
			alert(message,resolve)
	})
}