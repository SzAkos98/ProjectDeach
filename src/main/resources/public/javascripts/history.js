var oneSelectedHistory = ["#selectAllHistory", "#addHistory", "#editSelectedHistory", "#deleteSelectedHistory" ];
var nullSelectedHistory = ["#selectAllHistory",  "#addHistory"];
var moreSelectedHistory = ["#selectAllHistory", "#addHistory", "#deleteSelectedHistory"];
var allHistorySelected = false;
var host = "http://"+window.location.host;
var context = "/history";
var historyRecords;
var pageNumHistory=0;
var maxElementHistory;
var maxPageNumHistory;

$( document ).ready(function() {
    hideAll();
    bindMenu();
    $("#historymenu").click();
});

function hideAll(){
    $("#history").hide();
}

function bindMenu(){
    $("#logomenu").parent().on("click", function () {
        window.location = "index.html";
    });

    $("#homemenu").parent().on("click", function () {
        window.location = "index.html";
    });

    $("#palyermenu").parent().on("click", function () {
        window.location="players.html";
    });

    $("#historymenu").parent().on("click", function () {
        hideAll();
        $("#history").show();
        loadHistoryTable();
        showHistoryActions();
    });

    $("#firstPageBtnHistory").on("click", function () {
        hideAll();
        $("#history").show();
        loadHistoryTable();
        showHistoryActions();
    });

    $("#prevPageBtnHistory").on("click", function () {
        hideAll();
        $("#history").show();
        prevPageHistory();
        showHistoryActions();
    });

    $("#nextPageBtnHistory").on("click", function () {
        hideAll();
        $("#history").show();
        nextPageHistory();
        showHistoryActions();
    });

    $("#lastPageBtnHistory").on("click", function () {
        hideAll();
        $("#history").show();
        lastPageHistory();
        showHistoryActions();
    });

    $("#addHistory").on("click", function () {
        $('#addHistoryModal').modal();
    });

    $("#addHistoryToDB").on("click", function () {
        $("#fakeHistorySubmit").click();
    });

    $("#historyForm").on("submit", function (e) {
        addHistory();
        return false;
    });

    $("#editSelectedHistory").on("click", function () {
        $("#editHistoryModal").modal();
        fillUpdateHistory();
    });

    $("#editHistorySubmit").on("click", function () {
        $("#fakeEditHistorySubmit").click();
    });

    $("#historyEditForm").on("submit", function() {
        editHistory();
        return false;
    });

    $("#deleteSelectedHistory").on("click", function () {
        $("#deleteHistoryModal").modal();
    });

    $("#deleteHistorySubmit").on("click",function () {
        deleteHistory();
    });


}

function bindSelections() {
    allHistorySelected = false;

    showHistoryActions();

    $("#history tbody tr").on("click", function () {
        var thisID = $(this).closest("table").attr("id");
        if($(this).hasClass("selected")){
            $(this).removeClass("selected");
            showHistoryActions();

        } else{
            $(this).addClass("selected");
            showHistoryActions();
        }
    });

    $("#selectAllHistory").on("click", function () {
        if(allHistorySelected){
            $("#history tbody tr").removeClass("selected");
            allHistorySelected = false;
            showHistoryActions();
        }
        else {
            $("#history tbody tr").addClass("selected");
            allHistorySelected = true;
            showHistoryActions();
        }
    });
}

function showHistoryActions(){
    $.each(oneSelectedHistory, function (index, value) {
        $(value).hide();
    });
    if($("#historyTable .selected").length == 0){
        $.each(nullSelectedHistory, function (index, value) {
            $(value).show();
        });
    }
    else if ($("#historyTable .selected").length == 1){
        $.each(oneSelectedHistory, function (index, value) {
            $(value).show();
        });
    }
    else {
        $.each(moreSelectedHistory, function (index, value) {
            $(value).show();
        });
    }
}


function getHistoryCount(){
    performgetBC().done(function(data){
        maxElementHistory = data;
    })
}


function performgetBC(){
    var defered = jQuery.Deferred();
    var jqxhr = $.ajax( {
        url: host+context+"/historycount",
        method: "GET"
    } )
        .done(function(data) {
            defered.resolve(data);
        })
        .fail(function(err) {
            defered.reject(err)
        });
    return defered.promise();
}

function loadHistoryTable() {
    pageNumHistory = 0;
    fetchHistory();
}

function lastPageHistory() {
    if (maxElementHistory%10 === 0) {
        pageNumHistory = (maxElementHistory/10)-1;
        fetchHistory();
    } else {
        pageNumHistory = (maxElementHistory/10) | 0;
        fetchHistory();
    }
}


function nextPageHistory() {
    if(maxElementHistory%10 === 0) {
        maxPageNumHistory = maxElementHistory/10;
        if (pageNumHistory === maxPageNumHistory) {
            fetchHistory();
        } else if (pageNumHistory < maxPageNumHistory-1){
            pageNumHistory += 1;
            fetchHistory();
        }
    } else if (maxElementHistory%10 !== 0) {
        maxPageNumHistory = maxElementHistory/10;
        if (pageNumHistory === maxPageNumHistory+1){
            fetchHistory();
        } else if (pageNumHistory < maxPageNumHistory-1){
            pageNumHistory += 1;
            fetchHistory();
        }
    }
}


function prevPageHistory() {
    if(pageNumHistory!==0){
        pageNumHistory -= 1;
    }
    fetchHistory();
}


function updateHistoryTable($table){
    var $tableBody = $table.children("tbody");
    $tableBody.html("");
    $.each(historyRecords, function (index, value) {
        $tableBody
            .append($("<tr>")
                .append($("<td>").addClass("td-id")
                    .text(value.historyId))
                .append($("<td>").addClass("td-competitionName")
                    .text(value.competitionName))
                .append($("<td>").addClass("td-playDate")
                    .text(value.playDate))
                .append($("<td>").addClass("td-teamName")
                    .text(value.teamName))
                .append($("<td>").addClass("td-playersName")
                    .text(value.playersName))
                .append($("<td>").addClass("td-playersNickname")
                    .text(value.playersNickname))
                .append($("<td>").addClass("td-streamLink")
                    .text(value.streamLink))
                .append($("<td>").addClass("td-leaderName")
                    .text(value.leaderName))
                .append($("<td>").addClass("td-place")
                    .text(value.place)));

    });
    bindSelections();
}


function performFetchHistory() {
    var defered = jQuery.Deferred();
    var jqxhr = $.ajax( {
        url: host+context+ "/history?page="+pageNumHistory,
        method: "GET"
    } )
        .done(function(data) {
            defered.resolve(data);
        })
        .fail(function(err) {
            defered.reject(err)
        });
    return defered.promise();
}


function fetchHistory() {
    performFetchHistory()
        .done(function (data) {
            historyRecords = data.data;
            getHistoryCount();
            updateHistoryTable($("#historyTable"));
        })
        .fail(function (err) {
            $.growl.error({ title: "HIBA!", message: err.responseJSON.message, location: "br"});
        });
}

function performAddHistory() {
    var defered = jQuery.Deferred();
    var jqxhr = $.ajax( {
        url: host+context + "/history",
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify({
            "competitionName": $("input[name=newCompetitionName]").val(),
            "playDate": $("input[name=newPlayDate]").val(),
            "teamName": $("input[name=newTeamName]").val(),
            "playersName": $("input[name=newPlayersName]").val(),
            "playersNickname": $("input[name=newPlayersNickname]").val(),
            "streamLink": $("input[name=newStreamLink]").val(),
            "leaderName": $("input[name=newLeaderName]").val(),
            "place": $("input[name=newPlace]").val()
        }),
        method: "POST"
    } )
        .done(function(data) {
            defered.resolve(data);
        })
        .fail(function(err) {
            defered.reject(err)
        });
    return defered.promise();
}

function addHistory() {
    performAddHistory()
        .done(function (data) {
            $.growl.notice({message: data.message, location: "br"});
            book = data;
            window.location="history.html";
            $("#addHistoryModal").modal("hide");
        })
        .fail(function (err) {
            $.growl.error({ title: "HIBA!", message: err.responseJSON.message, location: "br"});
        });
}


function fillUpdateHistory() {
    $("#historyEditForm input[name=editCompetitionName]").val($("#historyTable .selected .td-competitionName").text());
    $("#historyEditForm input[name=editPlayDate]").val($("#historyTable .selected .td-playDate").text());
    $("#historyEditForm input[name=editTeamName]").val($("#historyTable .selected .td-teamName").text());
    $("#historyEditForm input[name=editPlayersName]").val($("#historyTable .selected  .td-playersName").text());
    $("#historyEditForm input[name=editPlayersNickname]").val($("#historyTable .selected  .td-playersNickname").text());
    $("#historyEditForm input[name=editStreamLink]").val($("#historyTable .selected  .td-streamLink").text());
    $("#historyEditForm input[name=editLeaderName]").val($("#historyTable .selected  .td-leaderName").text());
    $("#historyEditForm input[name=editPlace]").val($("#historyTable .selected  .td-place").text());
}

function updateHistory() {
    var defered = jQuery.Deferred();
    var jqxhr = $.ajax( {
        url: host+context+ "/history/" +$("#historyTable .selected .td-id").text(),
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify({
            "competitionName": $("input[name=editCompetitionName]").val(),
            "playDate": $("input[name=editPlayDate]").val(),
            "teamName": $("input[name=editTeamName]").val(),
            "playersName": $("input[name=editPlayersName]").val(),
            "playersNickname": $("input[name=editPlayersNickname]").val(),
            "streamLink": $("input[name=editStreamLink]").val(),
            "leaderName": $("input[name=editLeaderName]").val(),
            "place": $("input[name=editPlace]").val()
        }),
        method: "PUT"
    } )
        .done(function(data) {
            defered.resolve(data);
        })
        .fail(function(err) {
            defered.reject(err)
        });
    return defered.promise();
}

function editHistory() {
    updateHistory()
        .done(function (data) {
            $.growl.notice({message: data.message, location: "br"});
            book = data;
            loadHistoryTable();
            $("#editHistoryModal").modal("hide");
        })
        .fail(function (err) {
            $.growl.error({ title: "HIBA!", message: err.responseJSON.message, location: "br"});
        });
}

function performDeleteHistory() {
    var defered = jQuery.Deferred();
    var jqxhr = $.ajax( {
        url: host+context + "/history/"+ $("#historyTable .selected .td-id").text(),
        processData: false,
        method: "DELETE"
    } )
        .done(function(data) {
            defered.resolve(data);
        })
        .fail(function(err) {
            defered.reject(err)
        });
    return defered.promise();
}

function deleteHistory() {
    performDeleteHistory()
        .done(function (data) {
            $.growl.notice({message: data.message, location: "br"});
            loadHistoryTable();
            $("#deleteHistoryModal").modal("hide");
        })
        .fail(function (err) {
            $.growl.error({ title: "HIBA!", message: err.responseJSON.message, location: "br"});
        });
}