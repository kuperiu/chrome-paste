// var parent = chrome.contextMenus.create({
//     "title": "Paste easy link here",
// 	"contexts": ["editable"],
// 	"onclick": pasteLink
// });

var email = chrome.contextMenus.create({   
	"title": "Paste Email Address",
	"contexts": ["editable"],
	"onclick": pasteLink
});

var username = chrome.contextMenus.create({
	"title": "Paste Username",
	"contexts": ["editable"],
	"onclick": pasteLink
});


function pasteLink(info, tab){
	var val, status;

	if(info.menuItemId == email){
		val = "koko@gmail.com";
	}
	else if(info.menuItemId == username){
		val = "koko";
	}


	//Add all you functional Logic here
	chrome.tabs.query({
		"active": true,
		"currentWindow": true
	}, function (tabs) {
        status = "success";


		// send message to the current tab
		chrome.tabs.sendMessage(tabs[0].id, {
			status: status,
			link: val,
			type: typeof val
		});
	});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var allLinks = {};

    for(var key in localStorage){
        if(localStorage.hasOwnProperty(key) && localStorage.getItem(key) !== ''){
            allLinks[key] = localStorage.getItem(key);
        }
    }
    if (request.method == "getLocalStorage")
        sendResponse({ data: allLinks });
    else
        sendResponse({}); // snub them.
});