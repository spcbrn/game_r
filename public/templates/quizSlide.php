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
                        <td class="question">What rhymes with chimes?</td>
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
                                <td class="answerTxt">Blah blah blah 1</td>
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
                                <td class="answerTxt">Blah blah blah 2</td>
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
                                <td class="answerTxt">Blah blah blah 3</td>
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
                        <td class="question">Who dat be dat?</td>
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
                                <td class="answerTxt">Blah blah blah 1</td>
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
                                <td class="answerTxt">Blah blah blah 2</td>
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
                                <td class="answerTxt">Blah blah blah 3</td>
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
                        <td class="question">Where in the world is carmen?</td>
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
                                <td class="answerTxt">Blah blah blah 1</td>
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
                                <td class="answerTxt">Blah blah blah 2</td>
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
                                <td class="answerTxt">Blah blah blah 3</td>
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
                        <td>what what a</td>
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