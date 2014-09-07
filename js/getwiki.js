function getWikiDescription(searchTerm, callback) {
	var theURL = "https://en.wikipedia.org/wiki/" + searchTerm.replace(" ", "_");  
   	$.ajax(theURL, {
		success:function(data){
			data = data.replace(/script/g, "");
			$("<div id='wikiElem'></div>").appendTo(document.body);
			$('#wikiElem').html(data);
			var paragraphs = $('#wikiElem #content #mw-content-text p');
			var content = paragraphs[0];
			if (content.textContent == "See also") {
				content = paragraphs[1];
			}

			content = content.textContent.replace(/\[[0-9]\]/g, "").replace("[citation needed]", "");
			callback(content);
		},
		dataType:"text",
    });
}

