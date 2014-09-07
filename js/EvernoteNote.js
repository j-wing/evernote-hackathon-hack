String.prototype.endswith = function(s) {
	return (this.slice(-(s.length)) == s);
}

var EvernoteNote = {
	init:function(noteID) {
		noteStore.getNote(AUTH_TOKEN, noteID, true, false, false, false, this.handleNote.bind(this));
	},
	handleNote:function(note) {
		console.log("Note acquired!", note);
		var content = PlainTextOfENML(note.content);
		var split = content.split("\n");
		var line;
		for (var i=0;i<split.length;i++) {
			line = split[i];
			if (line.trim().endswith(":")) {
				// Needs to be defined.
				var term = 
			}
		}
	}
}