var EvernoteEditorWatcher = EvernoteEditorWatcher || {};

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
		console.log("the term to be defined is: ", term);
		getWikiDescription(term, function(def) {
			this.handleWikiDefinition(def, elem)
		}.bind(this));
	},
	handleWikiDefinition:function(definition, elem) {
		elem.innerHTML = elem.innerHTML + " " + definition;
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