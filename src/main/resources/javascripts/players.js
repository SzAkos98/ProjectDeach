var oneSelectedMember = ["#selectAllMember", "#addMember", "#editSelectedMember", "#deleteSelectedMember" ];
var nullSelectedMember = ["#selectAllMember",  "#addMember"];
var moreSelectedMember = ["#selectAllMember", "#addMember", "#deleteSelectedMember"];
var allMembersSelected = false;
var host = "http://"+window.location.host;
var context = "/players";
var memberRecords;
var pageNumPerson=0;
var maxElementPerson;
var maxPageNumPerson;

$( document ).ready(function() {
    hideAll();
    bindMenu();
    $("#palyermenu").click();
});

function hideAll(){
    $("#members").hide();
}

function bindMenu(){
    $("#logomenu").parent().on("click", function () {
        window.location = "index.html";
    });

    $("#homemenu").parent().on("click", function () {
        window.location = "index.html";
    });


    $("#palyermenu").parent().on("click", function () {
        hideAll();
        $("#members").show();
        loadMembersTable();
        showMemberActions();
    });

    $("#firstPageBtnMembers").on("click", function () {
        hideAll();
        $("#members").show();
        loadMembersTable();
        showMemberActions();
    });

    $("#prevPageBtnMembers").on("click", function () {
        hideAll();
        $("#members").show();
        prevPageMembers();
        showMemberActions();
    });

    $("#nextPageBtnMembers").on("click", function () {
        hideAll();
        $("#members").show();
        nextPageMembers();
        showMemberActions();
    });

    $("#lastPageBtnMembers").on("click", function () {
        hideAll();
        $("#members").show();
        lastPageMembers();
        showMemberActions();
    });

    $("#addMember").on("click", function () {
        $('#addMemberModal').modal();
    });

    $("#addMemberToDB").on("click", function () {
        $("#fakeMemberSubmit").click();
    });

    $("#memberForm").on("submit", function (e) {
        addPerson();
        return false;
    });

    $("#editSelectedMember").on("click", function () {
        $("#editMemberModal").modal();
        fillUpdatePerson();
    });

    $("#editMemberSubmit").on("click", function () {
        $("#fakeEditMemberSubmit").click();
    });

    $("#memberEditForm").on("submit", function() {
        editMember();
        return false;
    });

    $("#deleteSelectedMember").on("click", function () {
        $("#deletePersonModal").modal();
    });

    $("#deletePersonSubmit").on("click",function () {
        deletePerson();
    });


}

function bindSelections() {
    allMembersSelected = false;

    showMemberActions();

    $("#members tbody tr").on("click", function () {
        var thisID = $(this).closest("table").attr("id");
        if($(this).hasClass("selected")){
            $(this).removeClass("selected");
                showMemberActions();

        } else{
            $(this).addClass("selected");
                showMemberActions();
        }
    });

    $("#selectAllMember").on("click", function () {
        if(allMembersSelected){
            $("#members tbody tr").removeClass("selected");
            allMembersSelected = false;
            showMemberActions();
        }
        else {
            $("#members tbody tr").addClass("selected");
            allMembersSelected = true;
            showMemberActions();
        }
    });
}

function showMemberActions(){
    $.each(oneSelectedMember, function (index, value) {
        $(value).hide();
    });
    if($("#membersTable .selected").length == 0){
        $.each(nullSelectedMember, function (index, value) {
            $(value).show();
        });
    }
    else if ($("#membersTable .selected").length == 1){
        $.each(oneSelectedMember, function (index, value) {
            $(value).show();
        });
    }
    else {
        $.each(moreSelectedMember, function (index, value) {
            $(value).show();
        });
    }
}


function getPersonCount(){
    performgetBC().done(function(data){
        maxElementPerson = data;
    })
}


function performgetBC(){
    var defered = jQuery.Deferred();
    var jqxhr = $.ajax( {
        url: host+context+"/membercount",
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

function loadMembersTable() {
    pageNumPerson = 0;
    fetchMembers();
}

function lastPageMembers() {
    if (maxElementPerson%10 === 0) {
        pageNumPerson = (maxElementPerson/10)-1;
        fetchMembers();
    } else {
        pageNumPerson = (maxElementPerson/10) | 0;
        fetchMembers();
    }
}


function nextPageMembers() {
    if(maxElementPerson%10 === 0) {
        maxPageNumPerson = maxElementPerson/10;
        if (pageNumPerson === maxPageNumPerson) {
            fetchMembers();
        } else if (pageNumPerson < maxPageNumPerson-1){
            pageNumPerson += 1;
            fetchMembers();
        }
    } else if (maxElementPerson%10 !== 0) {
        maxPageNumPerson = maxElementPerson/10;
        if (pageNumPerson === maxPageNumPerson+1){
            fetchMembers();
        } else if (pageNumPerson < maxPageNumPerson-1){
            pageNumPerson += 1;
            fetchMembers();
        }
    }
}


function prevPageMembers() {
    if(pageNumPerson!==0){
        pageNumPerson -= 1;
    }
    fetchMembers();
}


function updateMemberTable($table){
    var $tableBody = $table.children("tbody");
    $tableBody.html("");
    $.each(memberRecords, function (index, value) {
        $tableBody
            .append($("<tr>")
                .append($("<td>").addClass("td-id")
                    .text(value.playerId))
                .append($("<td>").addClass("td-name")
                    .text(value.playerName))
                .append($("<td>").addClass("td-address")
                    .text(value.playerAddress))
                .append($("<td>").addClass("td-playerMail")
                    .text(value.playerMail))
                .append($("<td>").addClass("td-birthDate")
                    .text(value.birthDate))
                .append($("<td>").addClass("td-guardianName")
                    .text(value.guardianName))
                .append($("<td>").addClass("td-guardianMail")
                    .text(value.guardianMail))
                .append($("<td>").addClass("td-gameName")
                    .text(value.gameName))
                .append($("<td>").addClass("td-inGameNickname")
                    .text(value.inGameNickname))
                .append($("<td>").addClass("td-playerStatus")
                    .text(value.playerStatus)));

    });
    bindSelections();
    bindInfoButtons();
}


function performFetchMembers() {
    var defered = jQuery.Deferred();
    var jqxhr = $.ajax( {
        url: host+context+"/players?page="+pageNumPerson,
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


function fetchMembers() {
    performFetchMembers()
        .done(function (data) {
            memberRecords = data.data;
            getPersonCount();
            updateMemberTable($("#membersTable"));
        })
        .fail(function (err) {
            $.growl.error({ title: "HIBA!", message: err.responseJSON.message, location: "br"});
        });
}

function performAddPerson() {
    var defered = jQuery.Deferred();
    var jqxhr = $.ajax( {
        url: host+context+"/players",
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify({
            "playerName": $("input[name=newMemberName]").val(),
            "playerAddress": $("input[name=newMemberAddress]").val(),
            "playerMail": $("input[name=newMemberMail]").val(),
            "birthDate": $("input[name=newMemberBirthDate]").val(),
            "guardianName": $("input[name=newMemberGuardianName]").val(),
            "guardianMail": $("input[name=newMemberGuardianMail]").val(),
            "gameName" : $("input[name=newMemberGameName]").val(),
            "inGameNickname": $("input[name=newMemberInGameNickname]").val(),
            "playerStatus": $("input[name=newMemberStatus]").val()
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

function addPerson() {
    performAddPerson()
        .done(function (data) {
            $.growl.notice({message: data.message, location: "br"});
            book = data;
            loadMembersTable();
            $("#addMemberModal").modal("hide");
        })
        .fail(function (err) {
            $.growl.error({ title: "HIBA!", message: err.responseJSON.message, location: "br"});
        });
}

function fillUpdatePerson() {
    $("#memberEditForm input[name=newMemberName]").val($("#membersTable .selected .td-name").text());
    $("#memberEditForm input[name=newMemberAddress]").val($("#membersTable .selected .td-address").text());
    $("#memberEditForm input[name=newMemberMail]").val($("#membersTable .selected .td-playerMail").text());
    $("#memberEditForm input[name=newMemberBirthDate]").val($("#membersTable .selected  .td-birthDate").text());
    $("#memberEditForm input[name=newMemberGuardianName]").val($("#membersTable .selected  .td-guardianName").text());
    $("#memberEditForm input[name=newMemberGuardianMail]").val($("#membersTable .selected  .td-guardianMail").text());
    $("#memberEditForm input[name=newMemberGameName]").val($("#membersTable .selected  .td-gameName").text());
    $("#memberEditForm input[name=newMemberInGameNickname]").val($("#membersTable .selected  .td-inGameNickname").text());
    $("#memberEditForm input[name=newMemberStatus]").val($("#membersTable .selected  .td-playerStatus").text());
}

function updatePerson() {
    var defered = jQuery.Deferred();
    var jqxhr = $.ajax( {
        url: host+context+"/players/"+$("#membersTable .selected .td-id").text(),
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify({
            "playerName": $("#memberEditForm input[name=newMemberName]").val(),
            "playerAddress": $("#memberEditForm input[name=newMemberAddress]").val(),
            "playerMail": $("#memberEditForm input[name=newMemberMail]").val(),
            "birthDate": $("#memberEditForm input[name=newMemberBirthDate]").val(),
            "guardianName": $("#memberEditForm input[name=newMemberGuardianName]").val(),
            "guardianMail": $("#memberEditForm input[name=newMemberGuardianMail]").val(),
            "gameName" : $("#memberEditForm input[name=newMemberGameName]").val(),
            "inGameNickname": $("#memberEditForm input[name=newMemberInGameNickname]").val(),
            "playerStatus": $("#memberEditForm input[name=newMemberStatus]").val()
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

function editMember() {
    updatePerson()
        .done(function (data) {
            $.growl.notice({message: data.message, location: "br"});
            book = data;
            loadMembersTable();
            $("#editMemberModal").modal("hide");
        })
        .fail(function (err) {
            $.growl.error({ title: "HIBA!", message: err.responseJSON.message, location: "br"});
        });
}

function performDeletePerson() {
    var defered = jQuery.Deferred();
    var jqxhr = $.ajax( {
        url: host+context+"/players/" + $("#membersTable .selected .td-id").text(),
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

function deletePerson() {
    performDeletePerson()
        .done(function (data) {
            $.growl.notice({message: data.message, location: "br"});
            loadMembersTable();
            $("#deletePersonModal").modal("hide");
        })
        .fail(function (err) {
            $.growl.error({ title: "HIBA!", message: err.responseJSON.message, location: "br"});
        });
}


