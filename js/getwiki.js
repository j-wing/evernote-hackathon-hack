//alert("this is running");
function getWikiDescription(searchTerm, callback)
{
	var theURL = "http://en.wikipedia.org/wiki/" + searchTerm.replace(" ", "_");
    //window.open(theURL);
	//var article = document.getElementsByTagName("P")[0];
	//localStorage.setItem("lastname", "Smith");
  var whatever = null;
  

   	$.ajax(theURL, {
      success:function(data){
        data = data.replace(/script/g, "");
     		$('#wikiElem').html(data);
      	callback($('#wikiElem p')[0].textContent.replace(/\[[0-9]\]/g, ""));
     	},
      dataType:"text",
    });
}
