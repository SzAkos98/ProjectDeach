

$( document ).ready(function() {
    hideAll();
    bindMenu();
    $("#homemenu").click();
});

function hideAll(){

    $("#home").hide();
}

function bindMenu(){
    $("#logomenu").parent().on("click", function () {
        window.location = "index.html";
    });

    $("#homemenu").parent().on("click", function () {
        hideAll();
        $("#home").show();
    });

    $("#palyermenu").parent().on("click", function () {
        window.location = "players.html";
    });

}