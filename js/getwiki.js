function getWikiDescription(searchTerm, callback) {
	var theURL = "https://en.wikipedia.org/wiki/" + searchTerm.replace(" ", "_");
	console.log(theURL);
   	$.ajax(theURL, {
		success:function(data){
			data = data.replace(/script/g, "");
			$("<div id='wikiElem'></div>").appendTo(document.body);
			$('#wikiElem').html(data);
			var paragraphs = $('#wikiElem #content #mw-content-text p');
			var content = paragraphs[0];
			if (content.textContent == "See also" || content.textContent.trim().startswith("Coordinates") || content.textContent.trim() == "") {
				content = paragraphs[1];
			}

			content = content.textContent.replace(/\[[0-9]\]/g, "").replace("[citation needed]", "");
			callback(content);
		},
		dataType:"text",
    });
}

String.prototype.startswith = function(s) {
	return (this.slice((s.length)) == s);
}