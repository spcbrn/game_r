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
    </head>
<body>
<script type="text/javascript" src="../js/common.js"></script>    
<script type="text/javascript" src="../js/gameLoader.js"></script>
<div>
<table width="940" height="752" cellspacing="0" cellpadding="0" border="0" style="background-color:#fff;">
    <tr>
        <td colspan="3"><img src="../art/level_top.png" /></td>
    </tr>
    <tr>
        <td><img src="../art/level_mid_left.png" /></td>
        <td width="800" height="600" style="position: relative;">
            <span style="margin: 0; position: absolute; top: 0px; left: 0px; width: 800px; height: 600px" >
               <iframe src="http://localhost:3001" width='100%' height="100%"></iframe>
           </span>
         </td>
        <td><img src="../art/level_mid_right.png" /></td>
    </tr>
    <tr>
        <td colspan="3"><img src="../art/level_bottom.png" /></td>
    </tr>
</table>
</div>
</body>
</html>