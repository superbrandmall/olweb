<?php
include_once '../../models/user/ChangeInfo.class.php';
$controller = new ChangeInfo();

if(isset($_POST['contact_phone_1']))  {
    $controller->_changeMobile_action();
}