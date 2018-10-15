
console.log(" THE TALK is loaded!!! ");

window.addEventListener('load', function(){
    console.log(" loaded  the talk");
    initTalk();

});

var states = [];
states[0] = {title:"Into Slide",template:"intro.html"};
states[1] = {title:"Talk Slide",template:"slideViewer.html",slide:1};
states[2] = {title:"Talk Slide",template:"slideViewer.html",slide:2};
states[3] = {title:"Talk Slide",template:"slideViewer.html",slide:3};
states[4] = {title:"Talk Slide",template:"slideViewer.html",slide:4};
states[5] = {title:"Interactive",template:"gameLoader.html"};

var currentState = 0;
var admin = false;

function  initTalk()
{
    console.log(" init the talk!!!! ");
    loadTemplate('intro');

    heartBeatTick();    

    console.log("test:",$.urlParam('admin'));
    if($.urlParam('admin'))
    {
        $("#controlPanelFrame").attr('src', "templates/controlPanel.html");
        $("#controlContainer").show();
        admin = true;
    }
}

function loadTemplate(type,idx)
{
    console.log("loadTemplate("+type+","+idx+") ");

    currentState = {type:type,idx:idx};

    var fail = false;
    switch(type)
    {
        case 'intro' :
            $("#talkFrame").attr('src', "templates/intro.html");
        break;

        case 'slides' :
            $("#talkFrame").attr('src', "templates/slideViewer.html?idx="+idx);
        break;

        case 'game' :
            $("#talkFrame").attr('src', "templates/gameLoader.html?idx="+idx);
        break;

        case 'quiz' :
            $("#talkFrame").attr('src', "templates/quizSlide.html?idx="+idx);
        break;

        default: fail = true;
    }

    if(!fail && admin)
    {
        setState();
    }
}

function setState(type,idx)
{
    console.log(" setState::: "+type+","+idx+" < ");
    $.ajax({
        type: "POST",
        url: "https://wwwforms.suralink.com/utahjs.php",
        data: {
            secret: 'utahJs',
            command: 'admin',
            adminCommand: 'setState',
            sKey: 'utahJs1234',
            state: currentState
        },
        success: function(data) 
        {
            var returnObj = $.parseJSON(data);
            console.log(" set state finished : ",returnObj);
            if(returnObj.success)
            {
                console.log(" ok now what!!!!!!!! ");
            }
            else if(returnObj.error) { showErrorMessage(returnObj.msg); }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { if(XMLHttpRequest.status != 0) alert('error : heart beat. '+textStatus); }
    });
    console.log(" set state all done... ");
}

function getStateTest()
{
    console.log(" getStateTest() ");
    $.ajax({
        type: "POST",
        url: "https://wwwforms.suralink.com/utahjs.php",
        data: {
            secret: 'utahJs',
            command: 'admin',
            adminCommand: 'getState',
            sKey: 'utahJs1234'
        },
        success: function(data) 
        {
            var returnObj = $.parseJSON(data);
            console.log(" get state finished : ",returnObj);
            if(returnObj.success)
            {
                console.log(" ok now what!!!!!!!! ");
            }
            else if(returnObj.error) { showErrorMessage(returnObj.msg); }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { if(XMLHttpRequest.status != 0) alert('error : heart beat. '+textStatus); }
    });
    console.log(" get state all done... ");
}

var heartBeatTimer;
var heartBeatTicks=0;
var heartBeatProcessing = false;
function startHeartBeat()
{
    console.log(" startHeartBeat....");
    $.ajax({
        type: "POST",
        url: "https://wwwforms.suralink.com/utahjs.php",
        data: {
            secret: 'utahJs',
            command: 'heartBeat',
            heartBeatTicks: heartBeatTicks,
            currentState: currentState,
        },
        success: function(data) 
        {
            heartBeatProcessing = false;

            var returnObj = $.parseJSON(data);
            console.log(" okay got some data..... : ",returnObj);
            if(returnObj.success)
            {
                console.log(" ok now what!!!!!!!! ");
                
                if(returnObj.data.hasOwnProperty('state'))
                {
                    console.log(" HAS A STATE !!!! ");
                    console.log(" HAS A STATE !!!! ");
                    if(returnObj.data.state.state != currentState.type)
                    {
                        console.log(" OMG it is a new type, load the fuckiing template.",returnObj.data.state);
                        loadTemplate(returnObj.data.state.state,returnObj.data.idx);
                    }
                }

                heartBeatTick();
            }
            else if(returnObj.error) { showErrorMessage(returnObj.msg); }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { if(XMLHttpRequest.status != 0) alert('error : heart beat. '+textStatus); }
    });
}

function heartBeatTick()
{
    console.log(" heartBeatTick ...."); 
    setTimeout(function(){
        console.log(" heartBeatTock ...."); 
        if(!heartBeatProcessing)
        {
            heartBeatTicks++;
            console.log(" heartBeatTick() __________ <"+heartBeatTicks+"> ");
            heartBeatProcessing = true;
            startHeartBeat();
        }
        else
        {
            console.log(" uhhhh im busy");
        }
    },2500);
}


