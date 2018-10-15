
window.addEventListener('load', function(){
    var newVideo = document.getElementById('introVideo');
    newVideo.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);

    setTimeout(function () {newVideo.pause();}, 500);
    $("#introVideo").click(function() {newVideo.play();});

    $("#start").click(startIntro);
    $("#videoStartWrapper").click(startIntro);
    $("#videoStart").click(startIntro);
});

function startIntro()
{
    $("#start").hide();
    var newVideo = document.getElementById('introVideo');
    newVideo.play();

    parent.startIntro();
}