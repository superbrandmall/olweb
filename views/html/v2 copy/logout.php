<?php
/**
 * The logout file
 * destroys the session
 * expires the cookie
 * redirects to login.php
 */
if(session_id() == '' || !isset($_SESSION)) {
    session_start();
}
session_destroy();
echo "<meta http-equiv=\"refresh\" content=\"0;url=home\">";
?>