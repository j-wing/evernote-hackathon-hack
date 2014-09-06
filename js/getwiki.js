<script type="text/javascript" src="jquery-2.1.1.js"></script>
<script type="text/javascript">
	
	function getWikiDescription(searchTerm)
	{
	    var theURL = "en.wikipedia.org/wiki/" + searchTerm.replace(" ", "_");
	    window.alert("URL IS: " + theURL);
	    
	   	var xmlHttp = null;
    	xmlHttp = new XMLHttpRequest();
    	xmlHttp.open( "GET", theUrl, false );
    	xmlHttp.send( null );
    	alert("test is: " + xmlHttp.responseText);
	    //return xmlHttp.responseText;
	}
	getWikiDescription("godwin's law");
</script>