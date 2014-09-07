// Temporary until we get a real note store url.
var NOTESTORE_URL = "https://sandbox.evernote.com/shard/s1/notestore";
// Temporary auth token
var AUTH_TOKEN = "S=s1:U=8f620:E=14fa4017722:C=1484c5048b8:P=1cd:A=en-devtoken:V=2:H=dc59daf40914508324c07af0ac591d34";

var noteStoreTransport = new Thrift.BinaryHttpTransport(NOTESTORE_URL);
var noteStoreProtocol = new Thrift.BinaryProtocol(noteStoreTransport);
var noteStore = new NoteStoreClient(noteStoreProtocol);

function displayNotes() {
	if (!localStorage.evNotebookGUID) {
		renderNotes(localStorage.evNotebookGUID);
	}
	else  {
		noteStore.listNotebooks(AUTH_TOKEN, function(notebooks) {
			localStorage.evNotebookGUID = notebooks[0].GUID;
			renderNotes(localStorage.evNotebookGUID);
		});
	}	
}

function renderNotes(notebookGUID) {
	noteStore.findNotes(AUTH_TOKEN, new NoteFilter({notebookGUID:notebookGUID}), 0, 100, function(noteList) {
		var source   = $("#notelist-tmpl").html();
		var compiled = Mustache.render(source, noteList.notes);
		$("#note-list").html(compiled);
		$(".note").click(function(e) {
			var id = $(this).data("note-id");
			chrome.tabs.create({url:"https://www.evernote.com/Home.action#n="+id});
		});
	});
}

displayNotes();