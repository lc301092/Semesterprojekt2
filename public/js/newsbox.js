//Henter nyheder fra newscollection og laver dem ved page load.
function initializeNews(newslist) { //Parameteren er alle nyheder fra databasen hentet lokalt
    //for loop der checker arrayets længde, og laver en nyhed for hvert entry
    for (var i = 0; i < newslist.length; i++) {
        //Definerer elementerne der skal være i nyheden
        var div = $("<div></div>").addClass("newsTab");
        var deleteButton = $("<button>Slet nyhed</button>").addClass("deleteNews");
        var editButton = $("<button>Rediger nyhed</button>").addClass("editNews");
        var title = $("<h1></h1>").attr("name", "title").addClass("news").attr('contenteditable', 'false');
        var dato = $("<h3></h3>").attr("name", "dato").addClass("newsdate");
        var paragraph = $("<p></p>").attr("name", "paragraph").addClass("news").attr('contenteditable', 'false');



        ////Smidder nyhedens div tag ind øverst i nyhedsboksen
        $(".newsContainer").prepend(div);
        //Smidder elementerne ind i div tagget
        if (localStorage.getItem('currentUser') == 'admin') {
            $(".newsTab").first().append(deleteButton, editButton, title, dato, paragraph);
            //Henter titel, dato og paragraf værdier fra arrayet

            $(".newsTab h1").first().append(newslist[i].title);
            $(".newsTab h3").first().append(newslist[i].dato);
            $(".newsTab p").first().append(newslist[i].paragraph);
        } else {
            $(".newsTab").first().append(title, dato, paragraph);
            //Henter titel, dato og paragraf værdier fra arrayet
            $(".newsTab h1").first().append(newslist[i].title);
            $(".newsTab h3").first().append(newslist[i].dato);
            $(".newsTab p").first().append(newslist[i].paragraph);
        }

    }
}


//Laver en dialogbox til at skrive en nyhed
function createDialog() {
    //Checker at der ikke findes en dialogbox i forvejen
    if (document.getElementsByClassName("dialogBox").length == 0) {
        //Definerer elementerne der skal være i dialogboxen
        //Holder et div tag
        var div = $("<div></div>").addClass("dialogBox");
        //Holder en top bar i dialogboxen
        var top = $("<div><p>Ny Nyhed</p></div>").addClass("top");
        //Holder hovedfeltet i dialogboxen
        var main = $("<div></div>").addClass("main");
        //Holder en form til dialogboxen
        var form = $("<form></form>").attr("id", "formAddNews").attr("name", "addNews").attr("method", "post").attr("action", "/main").addClass("hejmeddig");
        //Holder et label til titlen
        var newTitleLabel = $("<label>Overskrift:</label>").attr('for', 'newTitle').addClass("overskrift");
        //Holder titlen
        var newTitle = $("<input>").attr('type', 'text').addClass("newTitle").attr('name', 'newTitle');
        //Holder dags dato
        var d = new Date();
        var datoString = "" + d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
        var newDato = $("<input>").attr('type', 'hidden').addClass("newDato").attr('name', 'newDato');
        //Holder et label til paragrafen
        var newParagraphLabel = $("<label>Tekst:</label>").addClass("inputTekst").attr('for', 'newParagraph');
        //Holder paragrafen
        var newParagraph = $("<input>").attr('type', 'text').addClass("newParagraph").attr('name', 'newParagraph');
        //Holder annuler knappen
        var cancel = $("<button>Annuller</button>").addClass("cancelNews").attr('onclick', 'deleteDialog();');
        //Holder tilføj nyhed knappen
        var addNews = $("<button>Tilføj Nyhed</button>").addClass("addNews").attr("type", "submit").attr('onclick', 'createNews();');

        //Smidder dialogboxens div tag ind i dokumentet
        $(document.body).prepend(div);
        //Smidder top baren og hovedfeltet ind i dialogboxen
        $(".dialogBox").first().append(main);
        //Smidder formen ind i hovedfeltet
        $(".main").first().append(top, form);
        //Smidder resten af elementerne ind i formen
        $("#formAddNews").first().append(newTitleLabel, newTitle, newDato, newParagraphLabel, newParagraph, cancel, addNews);
        //Giver datoen til et det skjulte input (newDato)
        $(".newDato").first().val(datoString);
    }
}

//Tilføjer en nyhed med inputs fra dialogboxen
function createNews() {
    //Definerer elementerne der skal være i nyheden
    var div = $("<div></div>").addClass("newsTab");
    var deleteButton = $("<button>Slet nyhed</button>").addClass("deleteNews");
    var editButton = $("<button>Rediger nyhed</button>").addClass("editNews");
    var title = $("<h1></h1>").attr("name", "title").addClass("news").attr('contenteditable', 'false');
    var dato = $("<h3></h3>").attr("name", "dato");
    var paragraph = $("<p></p>").attr("name", "paragraph").addClass("news").attr('contenteditable', 'false');
    //Smidder nyhedens div tag ind i øverst i nyhedsboksen
    $(".newsContainer").append(div);
    //Smidder elementerne ind i nyheden
    $(".newsTab").first().append(deleteButton, editButton, title, dato, paragraph);
    //Henter titel, dato og paragraf værdier fra inputsne i createDialog()
    $(".newsTab h1").first().append($('.newTitle').val());
    $(".newsTab h3").first().append($('.newDato').val());
    $(".newsTab p").first().append($('.newParagraph').val());

    //Push the input values to the database
}


//Redigerer en nyhed
$(document).on('click', '.editNews', function () {
    //Finder alle nyheder i nuværende div, og gør dem redigerbare
    var index = $(this).parent('div').index();
    console.log(index);
    var x = $(this).parent('div').find('.news');
    //Ændrer stadie mellem redigerbar og låst
    if (x.attr('contentEditable') == "true") {
        x.attr('contentEditable', 'false');

        this.innerHTML = "Rediger nyhed";

        var title = $(this).parent('div').find('h1').text();
        var paragraph = $(this).parent('div').find('p').text();
        console.log("title is: " + title, "paragraph is: " + paragraph);

        $.ajax({
                url: '/editnews',
                method: 'POST',
                data: {
                    'index': index,
                    "title": title,
                    "paragraph": paragraph
                }
            })
            .done(function (data) {
                console.log('from server: ', data);
            });
        //Save new values to the database
    } else {
        x.attr('contentEditable', 'true');
        this.innerHTML = "Gem nyhed";
    }
});


//Sletter en nyhed
$(document).on('click', '.deleteNews', function () {
    //Sletter nyhedens parent div m. alt indhold
    var index = $(this).parent('div').index();
    $(this).parent('div').remove();
    $.ajax({
            url: '/main',
            method: 'DELETE',
            data: {
                'index': index
            }
        })
        .done(function (data) {
            console.log('from server: ', data);
        });
});


//Sletter dialogboxen
function deleteDialog() {
    $(".dialogBox").remove();
}
