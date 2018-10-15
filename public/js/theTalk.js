
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

function  initTalk()
{
    console.log(" init the talk!!!! ");
    loadTemplate('intro');
}

function loadTemplate(type,idx)
{
    console.log("loadTemplate("+type+","+idx+") ");

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
    }
}

function startHeartBeat()
{

}

function processHeartBeat()
{
    
}