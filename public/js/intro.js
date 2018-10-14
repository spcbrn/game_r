
console.log(" THE TALK is loaded!!! ");

window.addEventListener('load', function(){

    console.log(" lets init this intro bitch");

    var newVideo = document.getElementById('introVideo');
    console.log("newVideo:",newVideo);
    newVideo.addEventListener('ended', function() {
        console.log(" intro video ended!!! ");
        this.currentTime = 0;
        this.play();
    }, false);

    setTimeout(function () {
        console.log(" VIDEO PLAY !!! ");
        newVideo.play();
    }, 500);

    setTimeout(function () {
        console.log(" VIDEO PLAY !!! ");
        newVideo.play();
    }, 1000);

    setTimeout(function () {
        console.log(" VIDEO PLAY !!! ");
        newVideo.play();
    }, 5000);
    
    $("#introVideo").click(function() {
        console.log(" VIDEO click .... ");
        newVideo.play();
    });

});