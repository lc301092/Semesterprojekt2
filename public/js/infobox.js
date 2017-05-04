//Laver dialogbox til at skrive en nyhed
function createDialog() {
    if (document.getElementsByClassName("dialogBox").length == 0) {
        var div = $("<div></div>").addClass("dialogBox");
        var top = $("<div></div>").addClass("top");
        var main = $("<div></div>").addClass("main");
        var newTitleLabel = $("<label>Overskrift:</label>").attr('for', 'newTitle');
        var newTitle = $("<input>").attr('type', 'text').addClass("newTitle").attr('name', 'newTitle');
        var newParagraphLabel = $("<label>Tekst:</label>").attr('for', 'newParagraph');
        var newParagraph = $("<input>").attr('type', 'text').addClass("newParagraph").attr('name', 'newParagraph');
        var cancel = $("<button>Annuller</button>").addClass("addNews").attr('onclick', 'deleteDialog();');
        var addNews = $("<button>Tilføj Nyhed</button>").addClass("addNews").attr('onclick', 'createNews();');
        $(".body").prepend(div);
        $(".dialogBox").first().append(top, main);
        $(".main").first().append(newTitleLabel, newTitle, newParagraphLabel, newParagraph, cancel, addNews);
        $(".dialogBox").draggable({
            containment: "parent"
        });
    }
}

//Henter nyheder fra newscollection og laver dem ved page load.
function initializeNews(newslist) {
    //Make the newsbox
    for (var i = 0; i < newslist.length; i++) { //Connection til database virker ikke i static js filer?? Alternativ løsning
        var div = $("<div></div>").addClass("newsTab");
        var deleteButton = $("<button>-</button>").addClass("deleteNews");
        var editButton = $("<button>...</button>").addClass("editNews");
        var title = $("<h1></h1>").addClass("news").attr('contenteditable', 'false');
        var paragraph = $("<p></p>").addClass("news").attr('contenteditable', 'false');
        $(".createDialog").after(div);
        $(".newsTab").first().append(deleteButton, editButton, title, paragraph);
        //Get the input values from the database
        $(".newsTab h1").first().append(newslist[i].title); //Virker ikke endnu 
        $(".newsTab p").first().append(newslist[i].paragraph); //Virker ikke endnu
    }
}

//Tilføjer en nyhed - Variabler for div, knapper og tekst defineres, og sættes samlet ind øverst i infoboxen
function createNews() {
    //Make the newsbox
    var div = $("<div></div>").addClass("newsTab");
    var deleteButton = $("<button>-</button>").addClass("deleteNews");
    var editButton = $("<button>...</button>").addClass("editNews");
    var title = $("<h1></h1>").addClass("news").attr('contenteditable', 'false');
    var paragraph = $("<p></p>").addClass("news").attr('contenteditable', 'false');
    $(".createDialog").after(div);
    $(".newsTab").first().append(deleteButton, editButton, title, paragraph);
    //Get the input values from createDialog();
    $(".newsTab h1").first().append($('.newTitle').val());
    $(".newsTab p").first().append($('.newParagraph').val());
    //Push the input values to the database
    deleteDialog();
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

//Sletter dialogbox
function deleteDialog() {
    $(".dialogBox").remove();
}
