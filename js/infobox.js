//Tilføjer en nyhed - Variabler for div, knapper og tekst defineres, og sættes samlet ind øverst i infoboxen
function createNews() {
    var div = $("<div></div>").addClass("newsTab");
    var deleteButton = $("<button>-</button>").addClass("deleteNews");
    var editButton = $("<button>...</button>").addClass("editNews");
    var overskrift = $("<h1>Overskrift</h1>").addClass("news").attr('contenteditable', 'false');
    var paragraf = $("<p>Tekst...</p>").addClass("news").attr('contenteditable', 'false');
    $(".infobox").prepend(div);
    $(".newsTab").first().append(deleteButton, editButton, overskrift, paragraf);
}
//Redigerer en nyhed - Finder alle nyheder i nuværende div, og gør dem redigerbare
$(document).on('click', '.editNews', function () {
    var x = $(this).parent('div').find('.news');
    if (x.attr('contentEditable') == "true") {
        x.attr('contentEditable', 'false');
    } else {
        x.attr('contentEditable', 'true');
    }
    if (this.innerHTML == "...") {
        this.innerHTML = "Save";
    } else {
        this.innerHTML = "...";
    }
});

//Sletter en nyhed - Sletter nyhedens div m. alt indhold
$(document).on('click', '.deleteNews', function () {
    $(this).parent('div').remove();
});
