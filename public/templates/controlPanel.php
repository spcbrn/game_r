<?php require_once('../header.php'); ?>
<html>
    <head>
            <script type="text/javascript">document.domain = "suralink.com";</script>
            <style></style>
            <link rel="stylesheet" type="text/css" href="../art/presentation.css">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    </head>
<body>
<script type="text/javascript" src="../js/common.js"></script>
<script type="text/javascript" src="../js/controlPanel.js"></script>
<div>
    <div id="controlPanel">
        <ul>
            <li><a id="btn_intro" href="Javascript: parent.loadTemplate('intro');" class="button">Intro</a></li>
            <li><a id="btn_slides1" href="Javascript: parent.loadTemplate('slides',1);" class="button">Slides 1</a></li>

            <li><a id="btn_quiz1" href="Javascript: parent.loadTemplate('quiz',1);" class="button">Quiz 1</a></li>
            <li><a id="btn_quiz2" href="Javascript: parent.loadTemplate('quiz',2);" class="button">Quiz 2</a></li>
            <li><a id="btn_quiz3" href="Javascript: parent.loadTemplate('quiz',3);" class="button">Quiz 3</a></li>


            <li><a id="btn_slides1" href="Javascript: parent.loadTemplate('slides',2);" class="button">Slides 2</a></li>
            

            <li><a id="btn_quiz4" href="Javascript: parent.loadTemplate('quiz',4);" class="button">Quiz 4</a></li>
            <li><a id="btn_quiz5" href="Javascript: parent.loadTemplate('quiz',5);" class="button">Quiz 5</a></li>
            <li><a id="btn_quiz5" href="Javascript: parent.loadTemplate('quiz',6);" class="button">Quiz 6</a></li>
     
            <li><a id="btn_game1" href="Javascript: parent.loadTemplate('game',1);" class="button">Game Loader 1</a></li>

            <li><a id="btn_slides2" href="Javascript: parent.loadTemplate('slides',2);" class="button">Slides 2</a></li>
            
            <li><a id="btn_quiz4" href="Javascript: parent.loadTemplate('quiz',7);" class="button">Quiz 7</a></li>
            <li><a id="btn_quiz5" href="Javascript: parent.loadTemplate('quiz',8);" class="button">Quiz 8</a></li>
            <li><a id="btn_quiz5" href="Javascript: parent.loadTemplate('quiz',9);" class="button">Quiz 9</a></li>

            <li><a id="btn_game2" href="Javascript: parent.loadTemplate('game',2);" class="button">Game Loader 2</a></li>
            
            <li>___________________________________________</li>
            <li><a id="btn_quiz2" href="Javascript: parent.getStateTest();" class="button">Get State</a></li>
        </ul>
      </div>
</div>
</body>
</html>