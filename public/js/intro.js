
window.addEventListener('load', function(){
    var newVideo = document.getElementById('introVideo');
    newVideo.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);

    setTimeout(function () {newVideo.play();}, 500);
    setTimeout(function () {newVideo.play();}, 1000);
    setTimeout(function () {newVideo.play();}, 5000);
    $("#introVideo").click(function() {newVideo.play();});
});