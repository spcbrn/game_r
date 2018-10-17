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
                    }

                    tbody
                    {
                        vertical-align: top;
                    }
            </style>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
            <link rel="stylesheet" type="text/css" href="../art/mobile.css">
            <link rel="stylesheet" type="text/css" href="../art/presentation.css">
            <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
    </head>
<body  style="vertical-align:top;">
<script type="text/javascript" src="../js/common.js"></script>
<script type="text/javascript" src="../js/slides.js"></script>
<div>
<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align:top;">
        <tr>
            <td align="center"><span id="playerName" class="mHeader"></span></td>
        </tr>
        <tr>
            <td><table id="quizTable" class="quizTable" width="100%">
                <?php if($_GET['idx'] == 1) { ?>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class="question">Which of the following is more massive?</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">A supermasive black hole</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(1);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">All matter in the observable universe</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(2);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">node_modules</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(3);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                <?php } else if($_GET['idx'] == 2) { ?>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class="question">What is the name of this machine?</td>
                    </tr>
                    <tr>
                        <td><img src="../slide_art/c64.jpg" width="400px" height="auto"/></td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">Commodore 64</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(1);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">IBM PCJr</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(2);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">Apple IIe</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(3);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                <?php } else if($_GET['idx'] == 3) { ?>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class="question">What was the first international packet-based network called?</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">INTERNET</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(1);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">ARPANET</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(2);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">INTRANET</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(3);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
               <?php } else if($_GET['idx'] == 4) { ?>
                  <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class="question">What is the name of this robot?</td>
                    </tr>
                    <tr>
                        <td><img src="../slide_art/shakey.jpg" style="margin: auto;" /></td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">Wall-E</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(1);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">T1000</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(2);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">Shakey</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(3);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <?php } else if($_GET['idx'] == 5) { ?>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class="question">What year was A* proposed?</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">1968</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(1);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">2013</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(2);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">1955</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(3);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <?php } else if($_GET['idx'] == 6) { ?>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class="question"> Who created JavaScript?</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">Netscape</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(1);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">Oracle</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(2);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">Linus Trrivaldus</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(3);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <?php } else if($_GET['idx'] == 7) { ?>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class="question">Which of the following is not a reserved word in JavaScript?</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">finally</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(1);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">throw</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(2);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">undefined</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(3);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <?php } else if($_GET['idx'] == 8) { ?>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class="question">What is the name of the hero in the video game zelda?</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">Zelda</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(1);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">Link</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(2);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">Trogdor</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(3);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <?php } else if($_GET['idx'] == 9) { ?>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class="question">Which cult TV show from the 1990's, featuring David Duchovny and Gillian Anderson, was resurrected in 2016?</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">Bambi</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(1);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">The Matrix</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(2);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">The X-Files.</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(3);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <?php } else if($_GET['idx'] == 10) { ?>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class="question">In which city where the 2016 summer Olympics held?</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">Salt Lake City</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(1);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">Rio, Brazil.</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(2);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><hr/></td>
                    </tr>
                    <tr>
                        <td><table>
                            <tr>
                                <td class="answerTxt">Russia</td>
                            </tr>
                            <tr>
                                <td class="answerButton"><a class="buttonLarge" href="Javascript: selectAnswer(3);">Select Answer</a></td>
                            </tr>
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                <?php } else { ?>
                    <tr>
                        <td></td>
                    </tr>
                <?php } ?>
            </table></td>
        </tr>
</table>
</div>
<script>
        $("#playerName").html(Cookies.get('name'));

        
            if(Cookies.get('quiz_<?php print $_GET['idx']; ?>'))
            {
                $("#quizTable td.answerButton").each(function(i){ $(this).hide(); });
            }
            else
            {
                
            }

        function selectAnswer(answer)
        {
            $("#quizTable td.answerButton").each(function(i){ $(this).hide(); });
            if(Cookies.get('quiz_<?php print $_GET['idx']; ?>'))
            {
                return;
            }

            Cookies.set('quiz_<?php print $_GET['idx']; ?>',true);
            
            $.ajax({
            type: "POST",
            url: "https://wwwforms.suralink.com/utahjs.php",
            data: {
                secret: 'utahJs',
                command: 'submitQuiz',
                idx: <?php print $_GET['idx']; ?>,
                answer: answer,
                name: Cookies.get('name'),
                myId: Cookies.get('myId')
            },
            success: function(data) 
            {
                heartBeatProcessing = false;
    
                var returnObj = $.parseJSON(data);
                if(returnObj.success)
                {
                    $("#clickToStart").html("<span class=\"mHeader\">Welcome "+name+" to the game, good luck!</span>");
                    $("#playerGet").html('');
                    
                    parent.heartBeatTick();
                }
                else if(returnObj.error) { showErrorMessage(returnObj.msg); }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { if(XMLHttpRequest.status != 0) alert('error : heart beat. '+textStatus); }
        });

        }

</script>
</body>
</html>