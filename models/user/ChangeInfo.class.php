<?php
if (file_exists('system/BaseObject.php')) {
    include_once 'system/BaseObject.php';
} else {
    include_once '../../system/BaseObject.php';
}

class ChangeInfo extends BaseObject {
    public function _getMobileEmail_action() {
        global $db;
        $get_info = $db->get_results("SELECT `email`,`mobile` FROM `t_ol_user` WHERE `merchant_code`= '".$_SESSION['mid']."' AND `state`=1 ");        
        return $get_info;
    }
}