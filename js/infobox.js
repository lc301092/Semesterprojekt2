//Tilføjer en nyhed
function createNews() {
    var div = $("<div></div>").addClass("newsTab");
    var deleteButton = $("<button>-</button>").addClass("deleteNews");
    var editButton = $("<button>...</button>").addClass("editNews");
    var overskrift = $("<h1>Overskrift</h1>").addClass("news").attr('contenteditable', 'false');
    var paragraf = $("<p>Tekst...</p>").addClass("news").attr('contenteditable', 'false');
    $(".infobox").prepend(div);
    $(".newsTab").first().append(deleteButton, editButton, overskrift, paragraf);
}
//Funktion der sørger for redigering af tekst i nyheder.
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

//Sletter nyheden, ved at fjerne div tagget den er i.
$(document).on('click', '.deleteNews', function () {
    $(this).parent('div').remove();
});
