var EvernoteEditorWatcher = EvernoteEditorWatcher || {};
function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    if (typeof window.getSelection != "undefined") {
        var range = window.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
    } else if (typeof document.selection != "undefined" && document.selection.type != "Control") {
        var textRange = document.selection.createRange();
        var preCaretTextRange = document.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

EvernoteEditorWatcher = {
	init:function() {
		alert("elllo");
		this.evernoteEditor = $(".mce-container iframe")[0]
		this.evernoteEditor.contentWindow.addEventListener("keydown", this.handleKeyDown.bind(this));
	},
	handleKeyDown:function(e) {
		if (e.which != 186) {
			return;
		}
		var selection = this.evernoteEditor.contentDocument.getSelection();
		var elem = selection.focusNode.parentNode;
		var split = elem.innerHTML.split(":");
		var term = split[0];
		if (!term) {
			return;
		}
		console.log("the term to be defined is: ", term);
		getWikiDescription(term, function(def) {
			this.handleWikiDefinition(def, elem, term)
		}.bind(this));
	},
	handleWikiDefinition:function(definition, elem, term) {
		elem.innerHTML = elem.innerHTML + " " + definition;
		chrome.runtime.sendMessage({term: term, def:definition}, function(response) {
		});
	}
}

function checkLoaded() {
	if ($(".mce-container iframe").length > 1) {
		EvernoteEditorWatcher.init();
	}
	else {
		setTimeout(checkLoaded, 100);
	}
}
setTimeout(checkLoaded, 100);