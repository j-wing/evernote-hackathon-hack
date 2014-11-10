// Temporary until we get a real note store url.
var NOTESTORE_URL = "https://sandbox.evernote.com/shard/s1/notestore";
// Temporary auth token
var AUTH_TOKEN = "S=s1:U=8f620:E=150f3d2090c:C=1499c20d9d8:P=1cd:A=en-devtoken:V=2:H=89178b440448e101c0fa92c3a611b872";

var noteStoreTransport = new Thrift.BinaryHttpTransport(NOTESTORE_URL);
var noteStoreProtocol = new Thrift.BinaryProtocol(noteStoreTransport);
var noteStore = new NoteStoreClient(noteStoreProtocol);

function displayNotes() {
	noteStore.listNotebooks(AUTH_TOKEN, function(notebooks) {
		renderNotes(notebooks[0].guid);
	});
}

function renderNotes(notebookGUID) {
	noteStore.findNotes(AUTH_TOKEN, new NoteFilter({notebookGUID:notebookGUID}), 0, 100, function(noteList) {
		var source = $("#notelist-tmpl").html();
		var compiled = Mustache.render(source, noteList.notes);
		$("#note-list").html(compiled);
		$(".note").click(function(e) {
			var id = $(this).data("note-id");
			chrome.tabs.create({url:"https://www.evernote.com/Home.action#n="+id});
		});
	});
}

displayNotes();