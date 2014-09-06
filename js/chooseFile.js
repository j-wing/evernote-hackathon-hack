// Temporary until we get a real note store url.
var NOTESTORE_URL = "https://sandbox.evernote.com/shard/s1/notestore";
// Temporary auth token
var AUTH_TOKEN = "S=s1:U=8f620:E=14fa4017722:C=1484c5048b8:P=1cd:A=en-devtoken:V=2:H=dc59daf40914508324c07af0ac591d34";

var noteStoreTransport = new Thrift.BinaryHttpTransport(NOTESTORE_URL);
var noteStoreProtocol = new Thrift.BinaryProtocol(noteStoreTransport);
var noteStore = new NoteStoreClient(noteStoreProtocol);

function displayNotes() {
	alert("running");
	if (!localStorage.evNotebookGUID) {
		renderNotes(localStorage.evNotebookGUID);
	}
	else  {
		alert("no id in ls");
		noteStore.listNotebooks(AUTH_TOKEN, function(notebooks) {
			localStorage.evNotebookGUID = notebooks[0].GUID;
			alert("got the guid" + localStorage.evNotebookGUID);
			renderNotes(localStorage.evNotebookGUID);
		});
	}	
}

function renderNotes(notebook) {
	alert("rendernotes called");
	noteStore.findNotes(AUTH_TOKEN, new NoteFilter(), 0, null, function(noteList) {
		console.log(noteList);
		var source   = $("#notelist-tmpl").html();
		var template = Handlebars.compile(source, noteList.notes);
	});
}

displayNotes();