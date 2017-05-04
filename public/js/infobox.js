//Laver dialogbox til at skrive en nyhed
function createDialog() {
    if (document.getElementsByClassName("dialogBox").length == 0) {
        var div = $("<div></div>").addClass("dialogBox");
        var top = $("<div></div>").addClass("top");
        var main = $("<div></div>").addClass("main");
        
        var form = $("<form></form>").attr("id", "formAddNews").attr("name", "addNews").attr("method", "post").attr("action", "/main");
        
        var newTitleLabel = $("<label>Overskrift:</label>").attr('for', 'newTitle');
        var newTitle = $("<input>").attr('type', 'text').addClass("newTitle").attr('name', 'newTitle');
        
        var d = new Date();
        var datoString = "" + d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
        
        //var newDatoLabel = $("<label>Dato:</label>").attr('for', 'newDato');
        var newDato = $("<input>").attr('type', 'hidden').addClass("newDato").attr('name', 'newDato');

        
        var newParagraphLabel = $("<label>Tekst:</label>").attr('for', 'newParagraph');
        var newParagraph = $("<input>").attr('type', 'text').addClass("newParagraph").attr('name', 'newParagraph');
        var cancel = $("<button>Annuller</button>").addClass("addNews").attr('onclick', 'deleteDialog();');
        
        
        var addNews = $("<button>Tilføj Nyhed</button>").addClass("addNews").attr("type", "submit").attr('onclick', 'createNews();');
        
        $(".body").prepend(div);
        $(".dialogBox").first().append(top, main);
        $(".main").first().append(form);

        $("#formAddNews").first().append(newTitleLabel, newTitle, newDato, newParagraphLabel, newParagraph, cancel, addNews);
        
        $(".newDato").first().val(datoString);
    
        $(".dialogBox").draggable({
            containment: "parent"
        });
    }
}

//Henter nyheder fra newscollection og laver dem ved page load.
function initializeNews(newslist) {
    //Make the newsbox
    for (var i = 0; i < newslist.length; i++) {
        
        var div = $("<div></div>").addClass("newsTab");
        var deleteButton = $("<button>-</button>").addClass("deleteNews");
        var editButton = $("<button>...</button>").addClass("editNews");
        var title = $("<h1></h1>").attr("name", "title").addClass("news").attr('contenteditable', 'false');
        
        var dato = $("<h3></h3>").attr("name", "dato");
        
        var paragraph = $("<p></p>").attr("name", "paragraph").addClass("news").attr('contenteditable', 'false');
        $(".createDialog").after(div);
        $(".newsTab").first().append(deleteButton, editButton, title, dato, paragraph);
        //Get the input values from the database
        
        
        $(".newsTab h1").first().append(newslist[i].title); 
        $(".newsTab h3").first().append(newslist[i].dato);
        $(".newsTab p").first().append(newslist[i].paragraph); 
    }
}

//Tilføjer en nyhed - Variabler for div, knapper og tekst defineres, og sættes samlet ind øverst i infoboxen
function createNews(newslist) {
    //Make the newsbox
    var div = $("<div></div>").addClass("newsTab");
    var deleteButton = $("<button>-</button>").addClass("deleteNews");
    var editButton = $("<button>...</button>").addClass("editNews");
    var title = $("<h1></h1>").attr("name", "title").addClass("news").attr('contenteditable', 'false');
    
    var dato = $("<h3></h3>").attr("name", "dato");
    
    var paragraph = $("<p></p>").attr("name", "paragraph").addClass("news").attr('contenteditable', 'false');
    $(".createDialog").after(div);
    $(".newsTab").first().append(deleteButton, editButton, title, dato, paragraph);
    //Get the input values from createDialog();
    $(".newsTab h1").first().append($('.newTitle').val());
    $(".newsTab h3").first().append($('.newDato').val());
    $(".newsTab p").first().append($('.newParagraph').val());
    //Push the input values to the database
}

//Redigerer en nyhed - Finder alle nyheder i nuværende div, og gør dem redigerbare
$(document).on('click', '.editNews', function () {
    var x = $(this).parent('div').find('.news');
    if (x.attr('contentEditable') == "true") {
        x.attr('contentEditable', 'false');
        this.innerHTML = "...";
        //Save new values to the database
    } else {
        x.attr('contentEditable', 'true');
        this.innerHTML = "Save";
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
