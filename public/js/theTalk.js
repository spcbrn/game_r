
console.log(" THE TALK is loaded!!! ");

window.addEventListener('load', function(){
    console.log(" loaded  the talk");
    initTalk();

});

var states = [];
states[0] = {title:"Into Slide",template:"intro.php"};
states[1] = {title:"Talk Slide",template:"slideViewer.php",slide:1};
states[2] = {title:"Talk Slide",template:"slideViewer.php",slide:2};
states[3] = {title:"Talk Slide",template:"slideViewer.php",slide:3};
states[4] = {title:"Talk Slide",template:"slideViewer.php",slide:4};
states[5] = {title:"Interactive",template:"gameLoader.php"};

var currentState = 0;
var admin = false;

function  initTalk()
{
    loadTemplate('intro');
    heartBeatTick();    

    console.log("test:",$.urlParam('admin'));
    if($.urlParam('admin'))
    {
        $("#controlPanelFrame").attr('src', "templates/controlPanel.php");
        $("#controlContainer").show();
        admin = true;
    }
}

function startIntro()
{
    $("#menuContainer").show();
    $("#jobContainer").show();


    // Set the date we're counting down to
    var countDownDate = new Date("Oct 16, 2018 19:30:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("countDownTime").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countDownTime").innerHTML = "EXPIRED";
    }
    }, 1000);
    
}

function loadTemplate(type,idx)
{
    console.log("loadTemplate("+type+","+idx+") ");

    currentState = {type:type,idx:idx};

    var fail = false;
    switch(type)
    {
        case 'intro' :
            $("#talkFrame").attr('src', "templates/intro.php");
        break;

        case 'slides' :
            $("#talkFrame").attr('src', "templates/slideViewer.php?idx="+idx);
        break;

        case 'game' :
            $("#talkFrame").attr('src', "templates/gameLoader.php?idx="+idx);
        break;

        case 'quiz' :
            $("#talkFrame").attr('src', "templates/quizSlide.php?idx="+idx);
        break;

        default: fail = true;
    }

    if(!fail && admin)
    {
        setState();
    }
}

var heartBeatTimer;
var heartBeatTicks=0;
var heartBeatProcessing = false;
function startHeartBeat()
{
    return;
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


