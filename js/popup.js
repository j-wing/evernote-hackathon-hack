
function main() {
	window.alert("HELLO");
	var noteStoreURL = "https://sandbox.evernote.com/shard/s1/notestore";
	var authenticationToken = "S=s1:U=8f620:E=14fa4017722:C=1484c5048b8:P=1cd:A=en-devtoken:V=2:H=dc59daf40914508324c07af0ac591d34";
	var noteStoreTransport = new Thrift.BinaryHttpTransport(noteStoreURL);
	var noteStoreProtocol = new Thrift.BinaryProtocol(noteStoreTransport);
	var noteStore = new NoteStoreClient(noteStoreProtocol);

	noteStore.listNotebooks(authenticationToken, function (notebooks) {
	        console.log(notebooks);
	    },
	    function onerror(error) {
	        console.log(error);
	    }
	);
}
main();