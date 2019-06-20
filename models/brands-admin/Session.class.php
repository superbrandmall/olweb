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
        if(!isset($_SESSION['brands_admin_login'])) {
            if(isset($_GET['p']) && $_GET['p'] != 'brands-admin/login') {
                header("location: $this->domain/login");
                die();
            }
        } else {
            if(isset($_GET['p']) && $_GET['p'] == 'brands-admin/login') {
                header("location: $this->domain/home");
                die();
            }
        }
    }
}