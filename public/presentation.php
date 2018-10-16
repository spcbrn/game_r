    <?php require_once('header.php'); ?>
    <html>
    <head>
        <script type="text/javascript">document.domain = "suralink.com";</script>
        <style>
            body
            {
                background-color:#000;
                background-image:url("art/largebg.jpg");
            }
        </style>
        <title>Game Design Using Canvas and React</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
        <link rel="stylesheet" type="text/css" href="art/presentation.css">
        <link rel="stylesheet" type="text/css" href="art/mobile.css">
        
        <?php if(isset($_GET['admin'])) { ?>
            <link rel="stylesheet" type="text/css" href="art/admin.css">
            <script type="text/javascript" src="js/talkAdmin.js"></script>
        <?php } ?>
    </head>
    <body>
        <div style="background-color:#fff;"><?php
            if(isset($_SESSION['myId']))
            {
                print 'myID:'.$_SESSION['myId'];
            }
            else
            {
                print 'no ID '.var_export($_SESSION,true);
            }
        ?></div>
        <div id="talkWrapper">
            <div id="theTalk">
                <div id="menuContainer" style="display:none;"><div id="theMenu">
                    <ul class="menuList" id="scoreBoardList">
                        
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
                        <li class="jobListing"><a href="https://www.suralink.com/web_applications_infrastructure_devops/" target="blank">Linux / Infra / DevOPs</a></li>
                        <li class="salary">Salary Range : $95k - $125k</li>
                        <li>&nbsp;</li>
                    </ul>
                </div></div>
                <iframe id="talkFrame"></iframe>
            </div>
            <div id="controlContainer" style="display:none;"><iframe id="controlPanelFrame"></iframe></div>
        </div>
        <script type="text/javascript" src="js/common.js"></script>
        <script type="text/javascript" src="js/theTalk.js"></script>
        <script>
            $( document ).ready(function() {
                if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
                {
                    $("#theTalk").css("width","auto");
                    $("#theTalk").css("height","auto");
                    $("#theTalk").css("top","0");
                    $("#theTalk").css("left","0");
                    $("#theTalk").css("margin","auto");
                }
            });
        </script>
    </body>
</html>