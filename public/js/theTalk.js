
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
            $("#talkFrame").attr('src', "templates/"+states[currentState].template);
        break;

        case 'slides' :

        break;

        case 'game' :

        break;

        case 'quiz' :

        break;
    }
}

function startHeartBeat()
{

}

function processHeartBeat()
{
    
}