//Funktion der sørger for redigering af tekst i nyhed 0.
function editNews0(button) {
    var x = document.getElementsByClassName("news0");
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

//Funktion der sørger for redigering af tekst i nyhed 1.
function editNews1(button) {
    var x = document.getElementsByClassName("news1");
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
