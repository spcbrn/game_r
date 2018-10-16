


function joinGame()
{
    console.log(" >>>>>> JOIN GAME ");
    console.log("... JOIN GAME... ");

    var name = $("#playerNameInput").val();
    if($.trim(name) == "")
    {
        alert('You must provide a name!');
    }
    else
    {
        $("#clickToStart").html("<span class=\"mHeader\">Joining game....</span>");

        $.ajax({
            type: "POST",
            url: "https://wwwforms.suralink.com/utahjs.php",
            data: {
                secret: 'utahJs',
                command: 'joinGame',
                name: name,
                myId: myId
            },
            success: function(data) 
            {
                heartBeatProcessing = false;
    
                var returnObj = $.parseJSON(data);
                if(returnObj.success)
                {
                    $("#clickToStart").html("<span class=\"mHeader\">Welcome "+name+" to the game, good luck!</span>");
                    $("#playerGet").html('');
                    Cookies.set('name',name);
                    Cookies.set('myId',myId);

                    parent.heartBeatTick();
                }
                else if(returnObj.error) { showErrorMessage(returnObj.msg); }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { if(XMLHttpRequest.status != 0) alert('error : heart beat. '+textStatus); }
        });

    }

}