//Sletter nyheden, ved at fjerne div tagget den er i.
$(document).ready(function () {
    $(".deleteNews").click(function () {
        $(this).parent('div').remove();
    });
});
//Funktion der sørger for redigering af tekst i nyheder.
function editNews(button, news) {
    var thisNews;
    if (news == news0) {
        thisNews = "news0";
    } else if (news == news1) {
        thisNews = "news1"
    }
    var x = document.getElementsByClassName(thisNews); //Virker ikke
    var i;
    for (i = 0; i < x.length; i++) {
        if (x[i].contentEditable == "true") {
            x[i].contentEditable = "false";
        } else {
            x[i].contentEditable = "true";
        }
    }
    if (button.innerHTML == "...") {
        button.innerHTML = "Save";
    } else {
        button.innerHTML = "...";
    }
}
