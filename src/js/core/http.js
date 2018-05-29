import 'whatwg-fetch'
import config from '../config'

function getUrl(url) {
    if (!/^http/.test(url)) {
        url = url[0] === '/' ? url : '/' + url
        url = config.apiBaseUrl + url
    }
    return url
}

async function fetch(url,options = {}){
	var url = getUrl(url)
	options.headers = Object.assign({
	},options.headers)

	options.headers['Content-Type'] = 'application/json'
	var resp = await window.fetch(url,options)
	return resp
}

async function get(url,options = {}){
	return fetch(url,options)
}







export default {
	get
}