<script type="text/javascript">
console.log("HELLO")
var noteStoreURL = "https://sandbox.evernote.com/shard/s1/notestore";
var authenticationToken = "S=s1:U=8f620:E=150f3d2090c:C=1499c20d9d8:P=1cd:A=en-devtoken:V=2:H=89178b440448e101c0fa92c3a611b872";
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

</script>