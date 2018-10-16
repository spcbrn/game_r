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
                        overflow:hidden;
                    }
            </style>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
            <link rel="stylesheet" type="text/css" href="../art/mobile.css">
            <link rel="stylesheet" type="text/css" href="../art/presentation.css">
            <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
    </head>
<body>
<script type="text/javascript" src="../js/common.js"></script>
<script type="text/javascript" src="../js/slides.js"></script>
<div>
<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align:top;">
        <tr>
            <td align="center"><span id="playerName" class="mHeader"></span></td>
        </tr>
        <tr>
            <td align="center"><span id="playerName" class="mHeader"></span></td>
        </tr>
        <tr>
            <td class="mHeader"><img width="80%" height="100%" src="../slide_art/meme<?php print rand(1,4); ?>.png"/></td>
        </tr>
</table>
</div>
<script>
        $("#playerName").html(Cookies.get('name'));
</script>
</body>
</html>