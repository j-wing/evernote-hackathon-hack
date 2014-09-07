chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
  var terms = []
  if (window.localStorage['terms']) {
  	terms = JSON.parse(window.localStorage['terms']);
  }
  terms.push({term:request.term, def:request.def});
  window.localStorage.setItem("terms", JSON.stringify(terms));
 });