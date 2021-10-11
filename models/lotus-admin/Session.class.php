<?php
if (file_exists('system/BaseObject.php')) {
    include_once 'system/BaseObject.php';
} else if (file_exists('../../system/BaseObject.php')) {
    include_once '../../system/BaseObject.php';
} else {
    include_once '../../../system/BaseObject.php';
}
    
class Session extends BaseObject {
    public function _session() {
        if(!isset($_SESSION['lotus_admin_login'])) {
            if(isset($_GET['p']) && $_GET['p'] != 'lotus-admin/login') {
                header("location: $this->domain/login");
                die();
            }
        } else {
            if(isset($_GET['p']) && $_GET['p'] == 'lotus-admin/login') {
                header("location: $this->domain/home");
                die();
            }
        }
    }
}