<?php require_once('../header.php'); ?>
<html>
    <head>
            <script type="text/javascript">document.domain = "suralink.com";</script>
            <style>
                    body
                    {
                        margin:0;
                        padding:0;
                        width:1280px;
                        height:1024px;
                    }
            </style>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
            <link rel="stylesheet" type="text/css" href="../art/intro.css">
            <link rel="stylesheet" type="text/css" href="../art/mobile.css">
            <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
    </head>
<body>
    <div id="desktopView">
    <div id="start"><div id="videoStartWrapper"><div id="videoStart">Click to <span class="first">P</span>lay with us!</div></div></div>
    <video id="introVideo" width="1280" height="1080" loop>
        <source src="https://www.suralink.com/utahjs/theIntro.mp4" type="video/mp4" autoplay>
    </video>
</div>
<div id="mobileView" style="display:none;">
    <table width="100%" align="center">
        <tr>
            <td><img style="padding-left:6px; float:left; left: 165px; position: relative;" src="../slide_art/utahJs.png"><span class="mTitle" style="float:right; position:relative; left:-26px; top:12px;">Game Design<br/>Using Canvas<br/>and React</span></td>
        </tr>
        <tr><td><table id="noPlayer" style="display:none;">
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td align="center" id="playerGet"><input id="playerNameInput" class="mobileInput" type="text"/></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td align="center"><div id="clickToStart"><a class="buttonLarge" href="Javascript: joinGame();">Join Game!</a></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
        </table></td>
        </tr>
        <tr>
            <td><table id="welcomePlayer" style="display:none;">
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td align="center"><span id="welcomeBack" class="mHeader"></span></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
        </table
        </tr>

    </table>
</div>

<script>
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $("#mobileView").show();
        $("#desktopView").hide();
        
        $('body').css('background-color', ''); 
        
        if(Cookies.get('myId'))
        {
                $("#welcomePlayer").show();
                $("#noPlayer").hide();
                $("#welcomeBack").html("<span class=\"mHeader\">Welcome "+Cookies.get('name')+" to the game, good luck!</span>");
        }
        else
        {
            $("#welcomePlayer").hide();
            $("#noPlayer").show();
        }
    }
</script>
<script type="text/javascript" src="../js/intro.js"></script>
<script type="text/javascript" src="../js/game.js"></script>
</body>
</html>