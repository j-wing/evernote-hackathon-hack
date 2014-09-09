window.onload = function() {
    var tmpl = $("#tmpl").html();
    var rendered = Mustache.render(tmpl, {notes:JSON.parse(window.localStorage['terms'])});
    console.log(rendered);
    console.log($("#note-container"))
    $("#note-container").html(rendered);

    $("#clear").click(function() {
        window.localStorage.setItem('oldTerms', window.localStorage['terms'])
        window.localStorage.setItem('terms', "[]")
    })

    document.addEventListener("keydown", function(event) {
        var note_container = $("#note-container");
        var left_amt = +(note_container.css("left").slice(0, note_container.css("left").length-2));
        var pixels_to_move;
        //left arrow
        if (event.keyCode == 37) {
            if (left_amt + 610 <= 110) {
                pixels_to_move = "" + (left_amt + 610) + "px";
                $("#note-container").animate({left: pixels_to_move}, 200);
            }
        }
        //right arrow
        else if(event.keyCode == 39) {
            var num_notes = $(".note").length;
            if (left_amt - 610 > (110 - num_notes*380 - (num_notes-1)*220)) {
                pixels_to_move = "" + (left_amt - 610) + "px";
                $("#note-container").animate({left: pixels_to_move}, 200);
            }
        }
        //up arrow (reveal content)
        else if(event.keyCode == 38) {
            // $(".definition").slideUp();
            $(".definition").slideUp();
        }
        //down arrow (hide content)
        else if(event.keyCode == 40) {
            $(".definition").slideDown();
            // $(".definition").animate({top: "-400px"});
        }
    });
}