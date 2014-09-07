var app = 
{
	consumerKey : 'defnote',
	consumerSecret : '47a12a5c42f24e10',
	evernoteHostName : 'https://sandbox.evernote.com',

    loginWithEvernote: function() {
    options = {
        consumerKey: app.consumerKey,
        consumerSecret: app.consumerSecret,
        callbackUrl : "popup.html", // this filename doesn't matter in this example
        signatureMethod : "HMAC-SHA1",
    };

    oauth = OAuth(options);
    // OAuth Step 1: Get request token
    oauth.request({'method': 'GET', 'url': app.evernoteHostName + '/oauth', 'success': app.success, 'failure': app.failure});
    },

    success: function(data) {
        alert("step 1: ");
        var isCallBackConfirmed = false;
        var token = '';
        var vars = data.text.split("&");
        for (var i = 0; i < vars.length; i++) {
            var y = vars[i].split('=');
            if(y[0] === 'oauth_token')  {
                token = y[1];
            }
            else if(y[0] === 'oauth_token_secret') {
                this.oauth_token_secret = y[1];
                localStorage.setItem("oauth_token_secret", y[1]);
            }
            else if(y[0] === 'oauth_callback_confirmed') {
                isCallBackConfirmed = true;
            }
        }
        var ref;
        if(isCallBackConfirmed) {
            alert("step 2");
            // step 2
            ref = window.open(app.evernoteHostName + '/OAuth.action?oauth_token=' + token, '_blank');
            ref.addEventListener('loadstart',
                function(event) {
                    var loc = event.url;
                    if (loc.indexOf(app.evernoteHostName + '/Home.action?gotOAuth.html?') >= 0) {
                        var index, verifier = '';
                        var got_oauth = '';
                        var params = loc.substr(loc.indexOf('?') + 1);
                        params = params.split('&');
                        for (var i = 0; i < params.length; i++) {
                            var y = params[i].split('=');
                            if(y[0] === 'oauth_verifier') {
                                verifier = y[1];
                            }
                        }
                    } else if(y[0] === 'gotOAuth.html?oauth_token') {
                        got_oauth = y[1];
                    }
                    // step 3
                    oauth.setVerifier(verifier);
                    oauth.setAccessToken([got_oauth, localStorage.getItem("oauth_token_secret")]);
 
                    var getData = {'oauth_verifier':verifier};
                    ref.close();
                    oauth.request({'method': 'GET', 'url': app.evernoteHostName + '/oauth',
                        'success': app.success, 'failure': app.failure});
 
                }
            );
        } else {
            // Step 4 : Get the final token
            var querystring = app.getQueryParams(data.text);
            var authTokenEvernote = querystring.oauth_token;
            alert(" step4: " + authTokenEvernote);
            localStorage.setItem("authToken", app.authTokenEvernote);
            // authTokenEvernote can now be used to send request to the Evernote Cloud API
            
            // Here, we connect to the Evernote Cloud API and get a list of all of the
            // notebooks in the authenticated user's account:
            var noteStoreURL = querystring.edam_noteStoreUrl;
            var noteStoreTransport = new Thrift.BinaryHttpTransport(noteStoreURL);
            var noteStoreProtocol = new Thrift.BinaryProtocol(noteStoreTransport);
            var noteStore = new NoteStoreClient(noteStoreProtocol);
            var userStore = noteStore.getUserStore();
            alert("token: " + localStorage.getItem("authToken"));
            //console.log(userStore.getUser(localStorage.getItem("authToken")));

            /*noteStore.listNotebooks(authTokenEvernote, function (notebooks) {
                console.log(notebooks);
            },
        

        function onerror(error) {
            console.log(error);
        });*/
        }
    },
    failure: function(error) {
        console.log('error ' + error.text);
    },
    /*checkForLogin: function()
    {
        userStore.getUser(localStorage.getItem("authToken"));
        try{
            alert(localStorage.getItem("authToken"));
            userStore.getUser(localStorage.getItem("authToken"))
            alert("success");

        }
        catch(err){
            alert("failure");
            app.deleteLogin();
            app.loginWithEvernote();
        }
    },*/
    deleteLogin: function()
    {
        localStorage.removeItem("authToken");
    }
}
app.loginWithEvernote();
//app.loginWithEvernote();
//var client = new Evernote.Client({token: localStorage.getItem("authToken")});
/*var noteStoreURL = querystring.edam_noteStoreUrl;
var noteStoreTransport = new Thrift.BinaryHttpTransport(noteStoreURL);
var noteStoreProtocol = new Thrift.BinaryProtocol(noteStoreTransport);
var noteStore = new NoteStoreClient(noteStoreProtocol);
var userStore = noteStore.getUserStore();*/
//userStore.getUser(localStorage.getItem("authToken"));
//console.log(localStorage.getItem("authToken"));
/*console.log(userStore.getUser(localStorage.getItem("authToken")));
try{
    console.log("something");
    //console.log("output: " + UserStore.getUser(app.authTokenEvernote));
}
catch(err)
{
    alert("darn");
    //app.loginWithEvernote();
}
*/

