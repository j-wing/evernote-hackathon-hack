alert("this is running");
function getWikiDescription(searchTerm)
{
    var theURL = "http://en.wikipedia.org/wiki/" + searchTerm.replace(" ", "_");
	var article = null;
   	$.get(theURL, function(data){
   		wikiHelper(data);
   	}, "html");
}
function wikiHelper(data)
{
	alert(data);
	console.log(data.getElementsByTagName("P")[0]);
}
getWikiDescription("godwin's law");
