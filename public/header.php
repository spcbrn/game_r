<?php
//session_name(preg_replace("/[^a-z0-9_\.]/i", "", "suralink_utahjs"));
//ini_set('session.cookie_domain', "wwwforms.suralink.com");
//session_set_cookie_params(0, '/', "wwwforms.suralink.com", true, true);
if(!isset($_SESSION)) { @session_start(); }


if(!isset($_SESSION['myId']) || trim($_SESSION['myId']) == '')
{
    $_SESSION['myId'] = rand(1,9999).uniqid().rand(1,9999);
}

?>
<script> var myId = "<?php print $_SESSION['myId']; ?>";</script>