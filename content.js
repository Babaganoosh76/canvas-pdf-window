chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
	var iframe = document.getElementsByClassName('ef-file-preview-frame')[0] || Array.from(document.getElementsByTagName('iframe')).find(function(x){return !x.id && !x.className})
	if (!iframe) {
		return alert('Please open a file before clicking the extension')
	}
	var request = new XMLHttpRequest()
	request.open("GET", iframe.src, true)
	request.send(null)
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			url = request.responseText.match('"url":"(.*)"')[1]
			if (!url) {
				return alert('Could not find a valid file url.')
			} else {
				console.log('https://canvadocs.instructure.com'+url)
				window.open('https://canvadocs.instructure.com'+url)
			}
		}
	}
})