    <html>
    <head>
        <script type="text/javascript">document.domain = "suralink.com";</script>
        <style>
            body
            {
                background-color:#000;
                background-image:url("art/largebg.jpg");
                background-repeat:no-repeat;
            }
        </style>
        <title>Game Design Using Canvas and React</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <link rel="stylesheet" type="text/css" href="art/presentation.css">
        <?php if(isset($_GET['admin'])) { ?>
            <link rel="stylesheet" type="text/css" href="art/admin.css">
            <script type="text/javascript" src="js/talkAdmin.js"></script>
        <?php } ?>
    </head>
    <body>
        <div id="talkWrapper">
            <div id="theTalk">
                <div id="menuContainer" style="display:none;"><div id="theMenu">
                    <ul class="menuList">
                        <li class="countDown">Game will begin in</li>
                        <li id="countDownTime" class="countDown"><li>
                        <li>&nbsp;</li>
                        <li class="title">Score Board</li>
                        <li class="player">Player 1 : 0</li>
                        <li class="player">Player 2 : 0</li>
                        <li class="player">Player 3 : 0</li>
                        <li class="player">Player 4 : 0</li>
                        <li class="player">Player 5 : 0</li>
                        <li class="player">Player 6 : 0</li>
                        <li class="player">Player 7 : 0</li>
                        <li class="player">Player 8 : 0</li>
                        <li class="player">Player 9 : 0</li>
                        <li class="player">Player 10 : 0</li>
                    </ul>
                </div></div>
                <div id="jobContainer" style="display:none;"><div id="theJob">
                    <ul class="jobList">
                        <li class="hiring">We are hiring!</li>
                        <li>&nbsp;</li>
                        <li class="jobListing"><a href="https://www.suralink.com/web_applications_engineer/qa_jr_web_app/" target="blank">QA / Jr. Web Application React</a></li>
                        <li class="salary">Salary Range : $35k - $48k</li>
                        <li>&nbsp;</li>
                        <li class="jobListing"><a href="https://www.suralink.com/web_applications_engineer/" target="blank">Mid - Sr. Web Applications</a></li>
                        <li class="salary">Salary Range : $85k - $115k</li>
                        <li>&nbsp;</li>
                        <li class="jobListing"><a href="https://www.suralink.com/server_applications_engineer/" target="blank">Sr. Server Applications</a></li>
                        <li class="salary">Salary Range : $95k - $125k</li>
                        <li>&nbsp;</li>
                        <li class="jobListing"><a href="https://www.suralink.com/web_applications_infrastructure_devops/" target="blank">Linux / Infr / DevOPs</a></li>
                        <li class="salary">$95k - $125k</li>
                        <li>&nbsp;</li>
                    </ul>
                </div></div>
                <iframe id="talkFrame"></iframe>
            </div>
            <div id="controlContainer" style="display:none;"><iframe id="controlPanelFrame"></iframe></div>
        </div>
        <script type="text/javascript" src="js/common.js"></script>
        <script type="text/javascript" src="js/theTalk.js"></script>
    </body>
</html>